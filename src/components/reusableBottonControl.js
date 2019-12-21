import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';

const ReusableBottonControl = props => {
  const {landScapeOrientation} = props;

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.Button,
          {
            height: landScapeOrientation ? 25 : 40,
            padding: landScapeOrientation ? 7 : 8,
          },
        ]}
        onPress={props.onPress}>
        <View style={styles.controlIcons}>
          <Text style={{fontSize: 10, color: '#ff00bf'}}>
            {props.textTitle}
          </Text>
          <Image
            style={[
              styles.ImageStyle,
              {marginLeft: 5, marginRight: props.previous ? 5 : null},
            ]}
            source={props.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Button: {
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
    padding: 8,
  },
  ImageStyle: {
    width: 9,
    height: 9,
    tintColor: '#ff00bf',
  },
});

export default ReusableBottonControl;
