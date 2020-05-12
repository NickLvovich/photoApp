import {PHOTO_LIST, ADD_PHOTO} from '../types';

// reducer

const initialState = {
  photoData: [],
};

function Reducer(state = initialState, action) {
  console.log('state', state)
  switch (action.type) {
    case PHOTO_LIST:
      return {...state, photoData: action.payload};

    case ADD_PHOTO:
      return {...state, photos: action.payload};

    default:
      return state;
  }
}

export default Reducer;
