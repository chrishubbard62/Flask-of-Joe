from flask import Blueprint, request, redirect, render_template
from app.models import db, CoffeeImage
from flask_login import current_user, login_required
from ..forms.img_form import ImageForm
from app.api.aws_helpers import (
    upload_file_to_s3, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            # return render_template("post_form.html", form=form, errors=[upload])
            return {"errors": "errors"}


        url = upload["url"]
        new_image = CoffeeImage(url= url)
        # im thinking image has to be url instead
        db.session.add(new_image)
        db.session.commit()
        #may fix later
        return redirect("/")

    if form.errors:
        print('\n this is errors \n',form.errors)
        # return render_template("post_form.html", form=form, errors=form.errors)
        return {"errors": "errors"}

    # return render_template("post_form.html", form=form, errors=None)
    return {"good": "good"}
