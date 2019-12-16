import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';

import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

class CustomDrawer extends Component {
  navigateToScreen = route => () => {
    const navigationAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigationAction);
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.ContainerIcon}>
            <Image
              source={require('../Images/care.png')}
              style={[styles.Mainicon, {tintColor: '#0040ff'}]}
            />
            <Text style={styles.DrawerLogoText}> NeverThink</Text>
          </View>
          <DrawerNavigatorItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ContainerIcon: {
    flex: 1,
    height: 225,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'andriod' ? 20 : 0,
  },
  DrawerLogoText: {
    fontSize: 25,
    color: '#0000ff',
    fontWeight: '100',
    marginBottom: 15,
  },
  firstIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightDisplay: {
    marginRight: 20,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#0000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Mainicon: {
    width: 150,
    height: 150,
  },
  icon: {
    width: 45,
    height: 45,
  },
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(CustomDrawer);
