import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const mapView = (props) => {
  const mapRegion = {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return <MapView region={mapRegion} style={styles.mapView} />;
};

const styles = StyleSheet.create({
  mapView: { flex: 1 },
});
export default mapView;
