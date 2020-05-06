import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import * as actionCreators from '../store';
import ImagePicker from '../components/ImagePicker';
import CustomButton from '../components/CustomButton';
import LocationPicker from '../components/LocationPicker';

const newPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [pickedImagePath, setPickedImagePath] = useState();
  const [chosenLocation, setChosenLocation] = useState();
  const dispatch = useDispatch();

  const inputChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    if (titleValue.trim().length <= 0 || pickedImagePath.length <= 0 || !chosenLocation) {
      Alert.alert('Validation failed', 'please fill out all required fields', [{ text: 'okay' }]);
      return;
    }
    dispatch(actionCreators.addPlace(titleValue, pickedImagePath, chosenLocation));
    props.navigation.navigate('Place');
  };

  const imageTakenHandler = (imagePath) => {
    setPickedImagePath(imagePath);
  };

  const locationChosenHandler = useCallback((location) => {
    setChosenLocation(location);
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput onChangeText={inputChangeHandler} style={styles.textInput} value={titleValue} />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker onChosenLocation={locationChosenHandler} navigation={props.navigation} />
        <View style={styles.button}>
          <CustomButton onPress={savePlaceHandler}>Add Place</CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

newPlaceScreen.navigationOptions = {
  headerTitle: 'Add a new place',
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
  },
});
export default newPlaceScreen;
