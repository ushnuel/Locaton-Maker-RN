import React, { useEffect } from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/CustomHeaderButton';
import CenterItem from '../components/CenterItem';
import PlaceItem from '../components/PlaceItem';
import * as actionCreators from '../store';

const placeScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.fetchPlace());
  }, [dispatch]);

  if (places.length <= 0) {
    return (
      <CenterItem>
        <Text>You have not added any places</Text>
      </CenterItem>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onPress={() =>
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }
        />
      )}
    />
  );
};

placeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-add-circle' title='Add Place' onPress={() => navData.navigation.navigate('NewPlace')} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});
export default placeScreen;
