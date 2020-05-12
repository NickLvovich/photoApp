import {NOTE_LIST, ADD_NOTE} from '../types';

// reducer

const initialState = {
  noteData: [],
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case NOTE_LIST:
      return {...state, noteData: action.payload};

    case ADD_NOTE:
      return {...state, addNote: action.payload};

    default:
      return state;
  }
}

export default Reducer;
