
const ADD_IMAGE = 'coffee/addImage'
//? Chris /////////////////////////////////////////////////////////////////////////////////////
const GET_ALL_COFFEES = 'coffees/getAllCoffees'
//? Chris /////////////////////////////////////////////////////////////////////////////////////

const addPost = (payload) => {
    return {
        type: ADD_IMAGE,
        payload
    }
}

//? Chris /////////////////////////////////////////////////////////////////////////////////////
const getCoffees = (payload) => {
    return {
        type: GET_ALL_COFFEES,
        payload
    }
}
export const getCoffeesThunk = () => async (dispatch) => {
    const res = await fetch('/api/coffees');
    if(res.ok) {
        const data = await res.json();
        dispatch(getCoffees(data.Coffees));
        return data;
    }
}
//? Chris /////////////////////////////////////////////////////////////////////////////////////


export const createImage = (post) => async (dispatch) => {
    const response = await fetch(`/api/images`, {
        method: "POST",
        //   headers: {
        //     'Accept': 'application/json',
        //     "Content-Type": "application/json",
        //   },
        body: post
    });

    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(addPost(resPost));
    } else {
        const error = await response.json()
        console.log(error)
        console.log("There was an error making your post!")
    }
};

const initialState = {}

export default function coffeeReducer(state = initialState, action){
    switch (action.type){
        case ADD_IMAGE:
            return {...state, ImageUrls: action.payload}
//? Chris /////////////////////////////////////////////////////////////////////////////////////
        case GET_ALL_COFFEES: {
            const newState = {...state}
            action.payload.forEach((coffee) => {
                if(state[coffee.id]) {
                    newState[coffee.id] = {...state[coffee.id], ...coffee}
                } else {
                    newState[coffee.id] = coffee
                }
            })
            return newState
        }
//? Chris /////////////////////////////////////////////////////////////////////////////////////
        default:
            return state
    }
}
