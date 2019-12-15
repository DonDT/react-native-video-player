import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import ReusableBottonControl from './reusableBottonControl';
import LoopIcon from '../Images/update-arrows.png';
import NextIcon from '../Images/right-arrow.png';
import FastForwardIcon from '../Images/fast-forward.png';
import YouTube from 'react-native-youtube';

import APIKEY from '../Keys/ApiKey';

class ReusableVideoPlayer extends Component {
  render() {
    const {landScapeOrientation} = this.props;

    return (
      <View>
        <View onLayout={this.props.onLayout}>
          <YouTube
            apiKey={APIKEY}
            videoIds={this.props.videoIds}
            play={this.props.play}
            fullscreen={false}
            ref={this.props.youTubeRef}
            loop={this.props.loop}
            onReady={this.props.onReady}
            onChangeState={this.props.onChangeState}
            onChangeQuality={this.props.onChnageQuality}
            onError={this.props.onError}
            style={{
              alignSelf: 'stretch',
              height: {landScapeOrientation} ? 350 : 300,
              marginLeft: {landScapeOrientation} ? 1 : null,
              marginTop: {landScapeOrientation} ? 5 : null,
              marginRight: {landScapeOrientation} ? 3 : null,
            }}
            showinfo
            controls={1}
          />

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: {landScapeOrientation} ? 8 : 60,
              flexDirection: {landScapeOrientation} ? 'row' : null,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[
                  styles.LoopButton,
                  {
                    height: {landScapeOrientation} ? 25 : 40,
                    padding: {landScapeOrientation} ? 7 : 8,
                  },
                ]}
                onPress={this.props.onPressPrevious}>
                <View style={styles.controlIcons}>
                  <Image
                    style={{
                      width: 9,
                      height: 9,
                      tintColor: '#ff00bf',
                      marginRight: 5,
                    }}
                    source={require('../Images/left-arrow.png')}
                  />
                  <Text style={{fontSize: 10, color: '#ff00bf'}}>Previous</Text>
                </View>
              </TouchableOpacity>
              <ReusableBottonControl
                landScapeOrientation={this.props.landScapeOrientation}
                onPress={this.props.onPressLoop}
                titleText={this.props.loop === true ? 'Loop' : 'No Loop'}
                icon={LoopIcon}
              />
              <ReusableBottonControl
                landScapeOrientation={this.props.landScapeOrientation}
                onPress={this.props.onPressNext}
                titleText="Next"
                icon={NextIcon}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: {landScapeOrientation} ? null : 10,
              }}>
              <ReusableBottonControl
                landScapeOrientation={this.props.landScapeOrientation}
                onPress={this.props.onPressFifteen}
                titleText="15s"
                icon={FastForwardIcon}
              />
              <ReusableBottonControl
                landScapeOrientation={this.props.landScapeOrientation}
                onPress={this.props.onPressTwoMins}
                titleText="2 Min"
                icon={FastForwardIcon}
              />
              <ReusableBottonControl
                landScapeOrientation={this.props.landScapeOrientation}
                onPress={this.props.onPressFiveMins}
                titleText="5 Min"
                icon={FastForwardIcon}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReusableVideoPlayer;
