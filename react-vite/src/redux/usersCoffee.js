const GET_CURRENT_USER_COFFEES = 'coffee/get-current-user-coffee';
const DELETE_COFFEE = 'coffee/deleteCoffee'

const getUserCoffees = coffees => {
    return {
        type: GET_CURRENT_USER_COFFEES,
        payload: coffees
    }
}

const deleteCoffee = (payload) => {
    return {
        type: DELETE_COFFEE,
        payload
    }
}

export const getUserCoffeesThunk = () => async dispatch => {
    const res = await fetch('/api/coffees/current')
    if (res.ok) {
        const data = await res.json();
        dispatch(getUserCoffees(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const deleteCoffeeThunk = (id) => async dispatch => {
    const res = await fetch(`/api/coffees/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(deleteCoffee(data))
        return data
    } else {
        const errors = await res.json()
        return errors
    }
}


const initialState = {};

export default function userCoffeeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_USER_COFFEES:
            return { ...state, ...action.payload }
        case DELETE_COFFEE: {
            const newState = { ...state }
            delete newState[action.payload.coffeeId]
            return newState
        }
        default:
            return state;
    }
}
