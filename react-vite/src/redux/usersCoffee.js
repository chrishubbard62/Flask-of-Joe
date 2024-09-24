const GET_CURRENT_USER_COFFEES = 'coffee/get-current-user-coffee';

const getUserCoffees = coffees => {
    return {
        type: GET_CURRENT_USER_COFFEES,
        payload: coffees
    }
}

export const getUserCoffeesThunk = () => async dispatch => {
    const res = await fetch('/api/coffees/current')
    if (res.ok){
        const data = await res.json();
        dispatch(getUserCoffees(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
}
export default function userCoffeeReducer(){}
