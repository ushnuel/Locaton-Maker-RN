import * as actionTypes from './ActionTypes';
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../db';

import ENV from '../env';

export const addPlace = (title, imageUri, location) => {
  return async (dispatch) => {
    const fileName = imageUri.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location.lat},${location.lng}&key=${ENV.googleAPIKey}`,
    );
    if (!response.ok) {
      throw new Error('Could not load location');
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error('Something went wrong');
    }

    const address = resData.results[0].formatted_address;

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);

      dispatch({
        type: actionTypes.ADD_PLACE,
        placeData: {
          title,
          image: newPath,
          id: dbResult.insertId.toString(),
          address,
          coordinates: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchPlace = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: actionTypes.SET_PLACE, places: dbResult.rows._array });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
