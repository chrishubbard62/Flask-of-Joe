from flask import Blueprint, request, redirect, render_template
from app.models import db, CoffeeImage, Coffee
from flask_login import current_user, login_required
from ..forms.img_form import ImageForm
from app.api.aws_helpers import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print(form.data)
        image = form.data["image"]
        coffee_id = form.data['coffee_id']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)


        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            # return render_template("post_form.html", form=form, errors=[upload])
            return {"errors": "errors"}


        url = upload["url"]
        new_image = CoffeeImage(url= url, coffee_id=coffee_id)
        # im thinking image has to be url instead
        db.session.add(new_image)
        db.session.commit()
        #may fix later
        return {'url': url, 'coffee_id': coffee_id}

    if form.errors:
        print('\n this is errors \n',form.errors)
        # return render_template("post_form.html", form=form, errors=form.errors)
        return {"errors": "errors"}

    # return render_template("post_form.html", form=form, errors=None)
    return {"good": "good"}


@image_routes.route('')
def get_all_images():
    '''
    get all coffee images
    '''
    all_coffee = CoffeeImage.query.all()
    return [coffee.to_dict_basic() for coffee in all_coffee]


@image_routes.route('/<int:coffee_id>')
def get_imgs_for_one_coffee(coffee_id):
    '''
    gets all images for one coffee
    '''
    one_coffee = CoffeeImage.query.filter(CoffeeImage.coffee_id == coffee_id)

    return [coffee.to_dict_basic() for coffee in one_coffee]


@image_routes.route('/<int:img_id>', methods=['DELETE'])
@login_required
def delete_image(img_id):
    '''
    deletes the selected image if they are the owner of the coffee
    '''
    img = CoffeeImage.query.filter(CoffeeImage.id == img_id).first()
    if not img:
        return {"errors":"Image does not exist!"},404

    coffee = img.coffee.to_dict_basic()
    # print('\n\nthis is coffee', coffee)
    # print('\n\nthis is coffee', type(coffee))
    # print('\n\nthis is coffee', dir(coffee))
    # print('\n\nthis is coffee', coffee['ownerId'])
    # print('\n\nthis is coffees owner id', coffee.values())

    if not coffee:
        return {"errors":"Coffee does not exist!"},404

    if coffee['ownerId'] == current_user.id:
        remove_file_from_s3(img.url)
        db.session.delete(img)
        db.session.commit()
        return {"messages":" Successfully deleted!"},200
    else:
        # not img.coffee.to_dict_basic().user_id == current_user.id
        return {"message":"forbidden"},403

    # return {"error":"howd you get here"}
