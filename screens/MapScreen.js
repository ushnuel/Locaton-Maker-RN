import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/CustomHeaderButton';

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const isReadOnly = props.navigation.getParam('isReadOnly');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 6.5244,
    longitude: initialLocation ? initialLocation.lng : 3.3792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('Saving location failed', 'you need to choose a location to continue', [{ text: 'okay' }]);
      return;
    }
    props.navigation.navigate('NewPlace', { mapLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: saveLocationHandler });
  }, [saveLocationHandler]);

  const selectLocationHandler = (event) => {
    if (isReadOnly) {
      return;
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let mappedCoordinate;

  if (selectedLocation) {
    mappedCoordinate = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView region={mapRegion} style={styles.mapView} onPress={selectLocationHandler}>
      {mappedCoordinate && <Marker coordinate={mappedCoordinate} title='Picked Location' />}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveLocationFxn = navData.navigation.getParam('saveLocation');
  const isReadOnly = navData.navigation.getParam('isReadOnly');

  if (isReadOnly) {
    return;
  }
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-save' title='Save' onPress={saveLocationFxn} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  mapView: { flex: 1 },
});
export default MapScreen;
