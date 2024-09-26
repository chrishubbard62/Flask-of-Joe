//!Get pending cart for current user
const GET_CART = 'cart/get';

export const getCart = (payload) => {
  return {
    type: GET_CART,
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



// //!Add a new cart item to user's cart
//!Not Done yet
const ADD_CARTITEM = 'cart/addItem';

const addCartItem = (payload) => {
  return {
    type: ADD_CARTITEM,
    payload
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


const initialState = {
  id: null
};

export default function cartReducer(state=initialState, action) {
  switch(action.type) {

    case GET_CART: {
      const newState = {...state};
      // console.log('newState: ', newState)
      // console.log('payload', action.payload)
      // console.log('action.payload.id :', action.payload.id)
      newState['id'] = action.payload.id;
      const cartItems = action.payload.cartItems;
      cartItems.forEach((cartItem) => {
        newState[cartItem.coffeeId] = cartItem.quantity
      })

      return newState;
    }

    //!Not Done yet
    case ADD_CARTITEM: {
      const newState = {...state};
      const cartItem = action.payload;
      // console.log(cartItem)
      // console.log(cartItem)
      newState[cartItem.coffeeId] = cartItem.quantity
      return newState;
    }

    default:
      return state
  }
}