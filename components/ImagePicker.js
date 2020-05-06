import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import CustomButton from './CustomButton';

const appImagePicker = (props) => {
  const [image, setImage] = useState();

  const verifyPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'enable camera permssions to use your camera', [
        {
          text: 'okay',
        },
      ]);
      return false;
    }
    return true;
  };

  const selectImageFromCamera = async () => {
    const permissionIsVerified = await verifyPermission();

    if (!permissionIsVerified) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 4],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    props.onImageTaken(result.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text>No image selected</Text>}
      </View>
      <View style={styles.button}>
        <CustomButton onPress={selectImageFromCamera} buttonStyle={styles.buttonStyle}>
          {!image ? 'Select Image' : 'Change Image'}
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonStyle: {
    width: 150,
    backgroundColor: 'gray',
  },
});
export default appImagePicker;
