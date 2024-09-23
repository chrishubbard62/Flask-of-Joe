
const ADD_IMAGE = 'coffee/addImage'

const addPost = (payload) => {
    return {
        type: ADD_IMAGE,
        payload
    }
}

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

//!--------------------------Luna---------------------------------
const GET_COFFEE = 'coffee/getCoffee';

const getCoffee = (payload) => {
    return {
        type: GET_COFFEE,
        payload
    }
};

export const getCoffeeThunk = (coffeeId) => async(dispatch) => {
    const res = await fetch(`/api/coffees/${coffeeId}`);
    if (res.ok) {
        const coffee = await res.json();
        dispatch(getCoffee(coffee));
        return coffee;
    } else {
        const err = await res.json();
        return err;
    }
}

//!--------------------------Luna---------------------------------
const initialState = {}

export default function coffeeReducer(state = initialState, action){
    switch (action.type){
        case ADD_IMAGE:
            return {...state, ImageUrls: action.payload}

 //!--------------------------Luna---------------------------------
        case GET_COFFEE: {
            const newState = {...state};
            const coffee = action.payload;
            if (state[coffee.id]) {
                newState[coffee.id] = {...state[coffee.id], ...coffee};
            } else {
                newState[coffee.id] = coffee;
            }

            return newState;
        }
//!--------------------------Luna---------------------------------
        default:
            return state
    }
}
