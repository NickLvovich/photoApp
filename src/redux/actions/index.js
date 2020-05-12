import axios from 'axios';
import {ADD_PHOTO, DELETE_PHOTO, PHOTO_LIST} from '../types';

export async function fetchPhotos(size) {
  console.log('size', size);
  const request = await axios
    .get(
      `https://whispering-forest-65400.herokuapp.com/api/photo/list/?pageNo=${1}&size=${size}`,
    )
    .then((response) => response.data)
    .catch((err) => console.log('err', err));

  return {
    type: PHOTO_LIST,
    payload: request,
  };
}

export async function submitPhotos(dataToSubmit) {
  console.log('dataToSubmit', dataToSubmit)
  const request = await axios
    .post(
      `https://whispering-forest-65400.herokuapp.com/api/photo/add_photo`,
      dataToSubmit,
    )
    .then((response) => response.data);

  return {
    type: ADD_PHOTO,
    payload: request,
  };
}
export async function deleteNote(dataToSubmit) {
  const request = await axios
    .post(
      `https://whispering-forest-65400.herokuapp.com/api/photo/delete`,
      dataToSubmit,
    )
    .then((response) => response.data)
    .catch((err) => console.log('err', err));

  return {
    type: DELETE_PHOTO,
    payload: request,
  };
}
export async function updateNote(dataToSubmit) {
  console.log('dataToSubmit', dataToSubmit);
  const request = await axios
    .post(
      `https://whispering-forest-65400.herokuapp.com/api/photo/update`,
      dataToSubmit,
    )
    .then((response) => response.data)
    .catch((err) => console.log('err', err));

  return {
    type: DELETE_PHOTO,
    payload: request,
  };
}
