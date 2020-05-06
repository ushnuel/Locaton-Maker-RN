import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';

const placeItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.placeItem} onPress={props.onPress}>
      <Image source={{ uri: props.image }} style={styles.image} />
      <View style={styles.placeDetail}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: '#ccc',
  },
  placeDetail: {
    marginLeft: 25,
    width: 220,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  address: {
    color: '#666',
    fontSize: 15,
  },
});
export default placeItem;
