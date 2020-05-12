import axios from 'axios';
import {ADD_NOTE, DELETE_NOTE, NOTE_LIST} from '../types';
import {NOTE_SERVER} from '../config';

export async function fetchNotes(size) {
  console.log('size', size);
  const request = await axios
    .get(
      `https://whispering-forest-65400.herokuapp.com/api/notes/list/?pageNo=${1}&size=${size}`,
    )
    .then((response) => response.data)
    .catch((err) => console.log('err', err));

  return {
    type: NOTE_LIST,
    payload: request,
  };
}

export async function submitNote(dataToSubmit) {
  const request = await axios
    .post(
      `https://whispering-forest-65400.herokuapp.com/api/notes/add_note`,
      dataToSubmit,
    )
    .then((response) => response.data);

  return {
    type: ADD_NOTE,
    payload: request,
  };
}
export async function deleteNote(dataToSubmit) {
  const request = await axios
    .post(
      `https://whispering-forest-65400.herokuapp.com/api/notes/delete`,
      dataToSubmit,
    )
    .then((response) => response.data)
    .catch((err) => console.log('err', err));

  return {
    type: DELETE_NOTE,
    payload: request,
  };
}
export async function updateNote(dataToSubmit) {
  console.log('dataToSubmit', dataToSubmit);
  const request = await axios
    .post(
      `https://whispering-forest-65400.herokuapp.com/api/notes/update`,
      dataToSubmit,
    )
    .then((response) => response.data)
    .catch((err) => console.log('err', err));

  return {
    type: DELETE_NOTE,
    payload: request,
  };
}
