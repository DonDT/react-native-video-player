import React from 'react';
import {Image} from 'react-native';

import Lol from './src/screens/lol';
import Wtf from './src/screens/wtf';
import MemeRadar from './src/screens/memeRadar';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import customDrawer from './src/components/customDrawer';

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
        tabBarLabel: 'Home',
        drawerIcon: () => (
          <Image
            style={{width: 20, height: 20, tintColor: '#ff00bf'}}
            source={require('./src/Images/love.png')}
            onPress={() => props.navigation.navigate('MemeRadar')}
          />
        ),
      },
    },
    Wtf: {
      screen: Wtf,
      navigationOptions: {
        title: 'What!?',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 20, height: 20, tintColor: '#ff00bf'}}
            source={require('./src/Images/heart_2.png')}
            onPress={() => props.navigation.navigate('MemeRadar')}
          />
        ),
      },
    },
    MemeRadar: {
      screen: MemeRadar,
      navigationOptions: {
        title: 'Bonfire',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 20, height: 20, tintColor: '#ff00bf'}}
            onPress={() => props.navigation.navigate('MemeRadar')}
            source={require('./src/Images/heart_1.png')}
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
      contentOptions: {
        activeTintColor: '#0000ff',
        activeBackgroundColor: '#ffbf00',
        inactiveBackgroundColor: 'grey',
      },
    },
    contentComponent: customDrawer,
  },
);

const AppContainer = createSwitchNavigator({
  AppDrawerNavigation,
});

export default createAppContainer(AppContainer);
