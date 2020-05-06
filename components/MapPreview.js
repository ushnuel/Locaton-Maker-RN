import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import ENV from '../env';

const MapPreview = (props) => {
  let imageUrl;

  if (props.location) {
    imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=12&size=400x200&key=${ENV.googleAPIKey}`;
  }

  return (
    <View style={{ ...styles.imagePreview, ...props.style }}>
      {props.location ? <Image source={{ uri: imageUrl }} style={styles.mapImage} /> : props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  mapImage: {
    width: '100%',
    height: '100%',
  },
  imagePreview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MapPreview;
