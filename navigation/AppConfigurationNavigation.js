import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceScreen from '../screens/PlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

const placeNavigator = createStackNavigator(
  {
    Place: PlaceScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: 'white',
    },
  },
);

export default createAppContainer(placeNavigator);
