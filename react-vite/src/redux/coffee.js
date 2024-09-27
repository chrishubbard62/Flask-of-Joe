
const ADD_IMAGE = 'coffee/addImage'
//? Chris /////////////////////////////////////////////////////////////////////////////////////
const GET_ALL_COFFEES = 'coffees/getAllCoffees'
const CREATE_COFFEE = 'coffees/createCoffee'
const UPDATE_COFFEE = 'coffees/updateCoffee'
const UPDATE_IMAGE = 'coffee/updateImage'
//? Chris /////////////////////////////////////////////////////////////////////////////////////
//-----------lalo-----------------

//-----------lalo-----------------

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
const createCoffee = (payload) => {
    return {
        type: CREATE_COFFEE,
        payload
    }
}

const updateCoffee = (payload) => {
    return {
        type: UPDATE_COFFEE,
        payload
    }
}

//---------------lalo----------------

//---------------lalo----------------

export const updateImageThunk =  (imageId, post) => async(dispatch) => {
    const res = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE'
    })
    const response = await fetch(`/api/images`, {
        method: "POST",
        body: post
    });
    if(res.ok) {
        if (response.ok) {
            const { resPost } = await response.json();
            dispatch(addPost(resPost));
        } else {
            const error = await response.json()
            console.log(error)
            console.log("There was an error making your post!")
        }
    }


}

export const getCoffeesThunk = () => async (dispatch) => {
    const res = await fetch('/api/coffees');
    if (res.ok) {
        const data = await res.json();
        dispatch(getCoffees(data.Coffees));
        return data;
    }
}

export const createCoffeeThunk = (coffee) => async (dispatch) => {
    const res = await fetch('/api/coffees' , {
        method: 'POST',
        body: JSON.stringify(coffee),
        headers: {'Content-Type': 'application/json'}
    })
    if(res.ok) {
        const newCoffee = await res.json()
        dispatch(createCoffee(newCoffee))
        return newCoffee;
    }
}

export const updateCoffeeThunk = (coffeeId, coffee) => async (dispatch) => {
    const res = await fetch(`/api/coffees/${coffeeId}`, {
        method: 'PUT',
        body: JSON.stringify(coffee),
        headers: {'Content-Type': 'application/json'}
    })
    if(res.ok) {
        const updatedCoffee = await res.json()
        dispatch(updateCoffee(updatedCoffee))
        return updatedCoffee
    }
}

//? Chris /////////////////////////////////////////////////////////////////////////////////////


export const createImage = (post) => async (dispatch) => {

    const response = await fetch(`/api/images`, {
        method: "POST",
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

//===============Lalos coffee.js code ==========================

//===============Lalos coffee.js code ==========================



//!--------------------------Luna---------------------------------
const GET_COFFEE = 'coffee/getCoffee';

const getCoffee = (payload) => {
    return {
        type: GET_COFFEE,
        payload
    }
};

export const getCoffeeThunk = (coffeeId) => async (dispatch) => {
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

export default function coffeeReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_IMAGE:
            return { ...state, ImageUrls: action.payload }
        case UPDATE_IMAGE:
            return { ...state, ImageUrls: action.payload }
        //? Chris /////////////////////////////////////////////////////////////////////////////////////
        case GET_ALL_COFFEES: {
            const newState = { ...state }
            action.payload.forEach((coffee) => {
                if (state[coffee.id]) {
                    newState[coffee.id] = { ...state[coffee.id], ...coffee }
                } else {
                    newState[coffee.id] = coffee
                }
            })
            return newState
        }
        case CREATE_COFFEE: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case UPDATE_COFFEE: {
            const newState = {...state}
            newState[action.payload.id] = {...newState[action.payload.id], ...action.payload}
            return newState;
        }
        //? Chris /////////////////////////////////////////////////////////////////////////////////////
        //===================Lalos reducer code========================
        
        //===================Lalos reducer code========================

        //!--------------------------Luna---------------------------------
        case GET_COFFEE: {
            const newState = { ...state };
            const coffee = action.payload;
            if (state[coffee.id]) {
                newState[coffee.id] = { ...state[coffee.id], ...coffee };
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
