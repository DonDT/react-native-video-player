import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';

const ReusableBottonControl = props => {
  const {landScapeOrientation} = props;

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.LoopButton,
          {
            height: {landScapeOrientation} ? 25 : 40,
            padding: {landScapeOrientation} ? 7 : 8,
          },
        ]}
        onPress={props.onPress}>
        <View style={styles.controlIcons}>
          <Text style={{fontSize: 10, color: '#ff00bf'}}>
            {props.textTitle}
          </Text>
          <Image
            style={[styles.ImageStyle, {marginLeft: 5}]}
            source={{uri: `${props.icon}`}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  LoopButton: {
    backgroundColor: 'gold',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  controlIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageStyle: {
    width: 9,
    height: 9,
    tintColor: '#ff00bf',
  },
});

export default ReusableBottonControl;
