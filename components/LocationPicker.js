import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';

import CustomButton from './CustomButton';
import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';

const locationPicker = (props) => {
  const [location, setLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam('mapLocation');
  const { onChosenLocation } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setLocation(mapPickedLocation);
      onChosenLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  const verifyPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'enable location permssions to use your location', [
        {
          text: 'okay',
        },
      ]);
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const permissionIsVerified = await verifyPermission();

    if (!permissionIsVerified) {
      return;
    }
    setIsFetching(true);

    let location;
    try {
      location = await Location.getCurrentPositionAsync({ timeout: 5000 });
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert('Could not load location', 'please try again or choose from your map', [{ text: 'okay' }]);
    }
    setIsFetching(false);
    props.onChosenLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const getLocationFromMap = () => {
    props.navigation.navigate('Map');
  };

  return (
    <TouchableOpacity style={styles.locationPicker} onPress={getLocationFromMap}>
      <MapPreview style={styles.locationPreview} location={location}>
        {!isFetching ? <Text>No location chosen yet</Text> : <ActivityIndicator size='large' color={Colors.primary} />}
      </MapPreview>
      <View style={styles.button}>
        <CustomButton onPress={getLocationHandler} buttonStyle={styles.buttonStyle}>
          Get my Location
        </CustomButton>
        <CustomButton onPress={getLocationFromMap} buttonStyle={styles.buttonStyle}>
          Choose from Map
        </CustomButton>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 10,
    alignItems: 'center',
  },
  locationPreview: {
    height: 150,
    width: '100%',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonStyle: {
    width: 140,
    backgroundColor: 'gray',
  },
});
export default locationPicker;
