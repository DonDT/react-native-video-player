import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import Lol from './src/screens/lol';
import Wtf from './src/screens/wtf';
import MemeRadar from './src/screens/memeRadar';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

//import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    Lol: {
      screen: Lol,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: () => (
          <Image
            style={{width: 20, height: 20}}
            source={{
              uri:
                'https://www.iconsdb.com/icons/preview/gray/clenched-fist-xxl.png',
            }}
          />
        ),
      },
    },
    Wtf: {
      screen: Wtf,
      navigationOptions: {
        tabBarLabel: 'What!?',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{width: 20, height: 20}}
            source={{
              uri:
                'https://www.iconsdb.com/icons/preview/royal-blue/so-so-xxl.png',
            }}
          />
        ),
      },
    },
    MemeRadar: {
      screen: MemeRadar,
      navigationOptions: {
        tabBarLabel: 'Bonfire',

        tabBarIcon: ({tintColor}) => (
          <Image
            style={{width: 20, height: 20}}
            source={{
              uri:
                'https://www.iconsdb.com/icons/preview/orange/applouse-xxl.png',
            }}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Lol',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',
      },
      showIcon: true,
    },
  },
);

const AppDrawerNavigation = createDrawerNavigator(
  {
    Lol: {
      screen: Lol,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: () => (
          <Image
            style={{width: 20, height: 20}}
            onPress={() => props.navigation.navigate('Lol')}
            source={{
              uri:
                'https://www.iconsdb.com/icons/preview/gray/clenched-fist-xxl.png',
            }}
          />
        ),
      },
    },
    Wtf: {
      screen: Wtf,
      navigationOptions: {
        title: 'What!?',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{width: 20, height: 20}}
            onPress={() => props.navigation.navigate('Wtf')}
            source={{
              uri:
                'https://www.iconsdb.com/icons/preview/royal-blue/so-so-xxl.png',
            }}
          />
        ),
      },
    },
    MemeRadar: {
      screen: MemeRadar,
      navigationOptions: {
        title: 'Bonfire',

        tabBarIcon: ({tintColor}) => (
          <Image
            style={{width: 20, height: 20}}
            onPress={() => props.navigation.navigate('MemeRadar')}
            source={{
              uri:
                'https://www.iconsdb.com/icons/preview/orange/applouse-xxl.png',
            }}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Lol',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',
      },
      showIcon: true,
    },
  },
);

const AppContainer = createSwitchNavigator({
  AppTabNavigator,
});

export default createAppContainer(AppContainer);
