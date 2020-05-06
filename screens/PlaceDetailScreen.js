import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const placeDetailScreen = (props) => {
  const placeId = props.navigation.getParam('placeId');
  const allPlaces = useSelector((state) => state.places.places);
  const selectedPlace = allPlaces.find((place) => place.id === placeId);

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const showMapHandler = () => {
    props.navigation.navigate('Map', {
      isReadOnly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <TouchableOpacity style={styles.locationContainer} onPress={showMapHandler} activeOpacity={0.9}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview style={styles.mapPreview} location={selectedLocation} />
      </TouchableOpacity>
    </ScrollView>
  );
};

placeDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
export default placeDetailScreen;
