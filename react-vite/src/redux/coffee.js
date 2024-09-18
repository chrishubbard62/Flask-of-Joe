
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

const initialState = {}

export default function coffeeReducer(state = initialState, action){
    switch (action.type){
        case ADD_IMAGE:
            return {...state, ImageUrls: action.payload}
        default:
            return state
    }
}
