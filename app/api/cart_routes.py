from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Cart, db, CartItem,Coffee
from ..forms.cart_item_form import CartItemForm

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/')
@login_required
def get_cart():
    '''
    get the cart for the current user
    '''
    cart = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.pending == 1).first()
    print('\n\n',cart,'\n\n')
    if not cart:
        return {"errrors":"Cannot find this cart"},404
    return cart.to_dict()


@cart_routes.route('/submit')
@login_required
def change_pending():
    '''
    change status of cart from pending false to true
    '''
    curr_cart = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.pending == 1).first()
    curr_cart.pending = False
    new_cart = Cart(user_id = current_user.id, pending=True)
    db.session.add(new_cart)
    db.session.commit()
    return new_cart.to_dict_basic()

#=============================================================================

@cart_routes.route('/', methods=["POST"])
@login_required
def add_item():
    '''
    adding a new cart item to the users cart items
    '''
    # how do we access the body of the request?
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()


    cart = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.pending.is_(True)).first()
    coffee = Coffee.query.filter(Coffee.id == data['coffee_id']).first()

    if coffee.owner_id == current_user.id:
        return {"errors":"This coffee does not belong to the current user!"},403
    if not coffee:
        return {"errors":"Cannot find this coffee"},404

    if form.validate_on_submit():
      new_item = CartItem(
          cart_id = cart.id,
          coffee_id = form.data['coffee_id'],
          quantity = form.data['quantity'],)
      db.session.add(new_item)
      db.session.commit()
      return new_item.to_dict_basic()

    return form.errors,400





@cart_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def remove_cart_item(id):
    '''
    delete an item from the cart items
    '''
    cart_item = CartItem.query.get(id)

    if not cart_item:
        return {"errors":"Cannot find cart item"},404

    cart = cart_item.cart.to_dict_basic()

    if not cart['userId'] == current_user.id:
        return {"errors":"forbidden"},403

    cart = Cart.query.filter()
    db.session.delete(cart_item)
    db.session.commit()

    return {"message":"Successfully deleted", 'id': cart_item.coffee_id}





@cart_routes.route('/<int:cart_id>', methods=['PUT'])
@login_required
def update_cart_item(cart_id):
    '''
    update a cart item (add up but not cover old quantity)
    '''
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cart = Cart.query.get(cart_id)

    # if not cart_item.cart.user_id == current_user.id:
    #     return {"errors":"forbidden"},403

    if form.validate_on_submit():
        coffee_id = form.data['coffee_id']
        cartItems = cart.to_dict()['cartItems']
        found_cartItem = list(filter(lambda cartItem: cartItem['coffeeId'] == coffee_id, cartItems))

        if len(found_cartItem) == 0:
            new_item = CartItem(
                cart_id = cart.id,
                coffee_id = coffee_id,
                quantity = 1,)
            db.session.add(new_item)
            db.session.commit()
            return new_item.to_dict_basic()
        else:
            id = found_cartItem[0]['id']
            cart_item = CartItem.query.get(id)
            new_quantity = request.get_json()['quantity']
            current_quantity = cart_item.to_dict_basic()['quantity']
            quantity = current_quantity + new_quantity
            cart_item.quantity = quantity
            db.session.commit()
            return cart_item.to_dict_basic()

    return form.errors,400


@cart_routes.route('/<int:cart_id>/update', methods=['PUT'])
@login_required
def update_cart_item_cover(cart_id):
    '''
    update a cart item (cover old quantity)
    '''
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cart = Cart.query.get(cart_id)

    # if not cart_item.cart.user_id == current_user.id:
    #     return {"errors":"forbidden"},403

    if form.validate_on_submit():
        # print(form.data)
        coffee_id = form.data['coffee_id']
        cartItems = cart.to_dict()['cartItems']
        found_cartItem = list(filter(lambda cartItem: cartItem['coffeeId'] == coffee_id, cartItems))

        id = found_cartItem[0]['id']
        cart_item = CartItem.query.get(id)
        cart_item.quantity = request.get_json()['quantity']

        db.session.commit()
        return cart_item.to_dict_basic()

    return form.errors,400

@cart_routes.route('/cart_items/<int:cart_id>')
@login_required
def getCartitems(cart_id):
    '''
    grabs all cart items by cart id
    '''
    cart_items = CartItem.query.filter(CartItem.cart_id == cart_id).all()

    return {'cartItems': [item.to_dict_basic() for item in cart_items]}
