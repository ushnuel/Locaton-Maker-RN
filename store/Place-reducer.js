import Place from '../models/Place';
import * as actionTypes from './ActionTypes';

const initialState = {
  places: [],
};

const addPlace = (state, action) => {
  const newPlace = new Place(
    action.placeData.id,
    action.placeData.title,
    action.placeData.image,
    action.placeData.address,
    action.placeData.coordinates.lat,
    action.placeData.coordinates.lng,
  );
  return {
    places: state.places.concat(newPlace),
  };
};

const fetchPlaces = (action) => {
  return {
    places: action.places.map(
      (place) => new Place(place.id.toString(), place.title, place.imageUri, place.address, place.lat, place.lng),
    ),
  };
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLACE:
      return fetchPlaces(action);
    case actionTypes.ADD_PLACE:
      return addPlace(state, action);
    default:
      return state;
  }
};

export default placeReducer;
