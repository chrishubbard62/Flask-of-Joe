//!Get pending cart for current user
const GET_CART = 'cart/get';
const ADD_CARTITEM = 'cart/addItem';
const UPDATE_CART_ITEM = 'cart/updateItem';
const DELETE_CART_ITEM = 'cart/deleteItem';
const GET_CART_ITEMS = 'cart-items/get-cart-items';
const SUBMIT_CART = 'cart/submit_cart';

export const getCart = (payload) => {
  return {
    type: GET_CART,
    payload
  }
}

const addCartItem = (payload) => {
  return {
    type: ADD_CARTITEM,
    payload
  }
}

const updateCartItem = (payload) => {
  return {
    type: UPDATE_CART_ITEM,
    payload
  }
}

const deleteCartItem = (payload) => {
  return {
    type: DELETE_CART_ITEM,
    payload
  }
}

const getCartItem = (payload) => {
  return {
    type: GET_CART_ITEMS,
    payload
  }
}

const submitCart = (payload) => {
  return {
    type: SUBMIT_CART,
    payload
  }
}

export const getCartThunk = () => async(dispatch) => {
  const res = await fetch(`/api/carts/`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getCart(data));
    return data;
  } else {
    const err = await res.json();
    return err;
  }
}

export const addCartItemThunk = (cartId, cartItem) => async(dispatch) => {
  const res = await fetch(`/api/carts/${cartId}`, {
    method: 'PUT',
    body: JSON.stringify(cartItem),
    headers: { 'Content-Type': 'application/json' }
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addCartItem(data));
    return data;
  } else {
    const err = await res.json();
    return err;
  }
}

export const updateCartItemThunk = (cart_id,cartItem) => async dispatch => {
  const res = await fetch(`/api/carts/${cart_id}/update`, {
    method: 'PUT',
    body: JSON.stringify(cartItem),
    headers: { 'Content-Type': 'application/json'}
  });

  if (res.ok){
    const data = await res.json();
    dispatch(updateCartItem(data))
    return data
  } else {
    const err = await res.json();
    return err;
  }
}

export const deleteCartItemThunk = (id) => async dispatch => {
  const res = await fetch(`/api/carts/${id}`, {
    method: 'DELETE'
  });

  if (res.ok){
    const data = await res.json();
    dispatch(deleteCartItem(data))
    return data
  } else {
    const err = await res.json();
    return err;
  }
}

export const getCartItemsThunk = (cart_id) => async dispatch => {
  const res = await fetch(`/api/carts/cart_items/${cart_id}`);

  if(res.ok){
    const data = await res.json();
    dispatch(getCartItem(data));
    return data;
  } else {
    const err = await res.json();
    return err;
  }
}

export const submitCartThunk = () => async dispatch => {
  const res = await fetch('/api/carts/submit');
  if(res.ok){
    const data = await res.json();
    dispatch(submitCart(data));
    return data;
  }
}

const initialState = {
  id: null
};

export default function cartReducer(state=initialState, action) {
  switch(action.type) {

    case GET_CART: {
      const newState = {...state};
      newState['id'] = action.payload.id;
      const cartItems = action.payload.cartItems;
      cartItems.forEach((cartItem) => {
        newState[cartItem.coffeeId] = cartItem.quantity
      })
      return newState;
    }
    case ADD_CARTITEM: {
      const newState = {...state};
      const cartItem = action.payload;
      newState[cartItem.coffeeId] = cartItem.quantity;
      return newState;
    }
    case UPDATE_CART_ITEM: {
      const newState = {...state}
      const cartItem = action.payload;
      newState[cartItem.coffeeId] = cartItem.quantity;

      return newState;
    }
    case DELETE_CART_ITEM: {
      const newState = {...state};
      delete newState[action.payload.id]
      return newState;
    }
    case GET_CART_ITEMS:{
      // console.log('\n this is action.p in get items',action.payload)
      return {...state, ...action.payload}
    }
    case SUBMIT_CART:{
      const newState = {}
      newState.id = action.payload.id
      return newState
    }
    default:
      return state
  }
}
