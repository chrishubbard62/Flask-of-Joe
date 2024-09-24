//!Get pending cart for current user
const GET_CART = 'cart/get';

const getCart = (payload) => {
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
const ADD_CARTITEM = 'cart/addItem';

const addCartItem = (payload) => {
  return {
    type: ADD_CARTITEM,
    payload
  }
}

export const addCartItemThunk = (cartItem) => async(dispatch) => {
  const res = await fetch(`/api/carts/`, {
    method: 'POST',
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
  currentCartId: null,
  cartItems: []
};

export default function cartReducer(state=initialState, action) {
  switch(action.type) {

    case GET_CART: {
      const newState = {...state};
      console.log('newState: ', newState)
      const cart = action.payload;
      newState.currentCartId = cart.id;
      console.log(cart.cartItems)

      newState.cartItems = [
        ...state.cartItems,
        ...cart.cartItems
      ]

      return newState;
    }

    case ADD_CARTITEM: {
      const newState = {...state};
      const cartItem = action.payload;
      // console.log(cartItem)
      console.log(state.cartItems)
      newState.cartItems = {
        // ...state.cartItems,
        ...cartItem
      }
      console.log(cartItem.id)
      return newState;
    }

    default:
      return state
  }
}