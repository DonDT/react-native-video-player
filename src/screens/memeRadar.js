import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  // AsyncStorage,
} from 'react-native';
import YouTube from 'react-native-youtube';
import {withNavigationFocus} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import APIKEY from '../Keys/ApiKey';

let videoIdsList = [
  '_Czxy3nya8Y',
  '8V0HETilr4I',
  'tHa260XXH6U',
  'J3iSEq5Apfg',
  'iCc5l8iWUZs',
  'p8UR4dODogI',
  'HoL1csZPYsk',
  'ADrBo7u3tR4',
  'BgZh5T4nG_w',
];

class MemeRadar extends Component {
  state = {
    play: false,
    //isFocused: false,
    loop: false,
    videosPlayed: [],
    arrayUponMount: [],
  };

  _youTubeRef = React.createRef();

  async componentDidMount() {
    this.setState({
      videoIds: videoIdsList,
      play: false,
    });
    try {
      const value = await AsyncStorage.getItem('@PlayList');
      if (value !== null) {
        console.log(value.length);
        // this.setState({
        //   arrayUponMount: [...this.state.arrayUponMount, JSON.parse(value)],
        // });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({
        //play: this.state.play == false ? true : false,
        play: this.state.play === false ? true : false,
      });
    }
    console.log(
      this._youTubeRef.current
        .getVideosIndex()
        .then(index => {
          this.state.videosPlayed.includes(index)
            ? null
            : this.setState(
                {videosPlayed: [...this.state.videosPlayed, index]},
                () => {
                  if (this.state.videosPlayed.length === videoIdsList.length) {
                    AsyncStorage.removeItem('@PlayList');
                  }
                  console.log(this.state.videosPlayed);
                },
              );
        })
        .catch(err => console.log(err)),
    );
    try {
      await AsyncStorage.setItem(
        '@PlayList',
        JSON.stringify({...this.state.videosPlayed}),
      );
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <YouTube
            apiKey={APIKEY}
            videoIds={this.state.videoIds}
            play={this.state.play}
            fullscreen={false}
            ref={this._youTubeRef}
            loop={this.state.loop}
            onReady={e => this.setState({isReady: true})}
            onChangeState={e => this.setState({status: e.state})}
            onChangeQuality={e => this.setState({quality: e.quality})}
            onError={e => this.setState({error: e.error})}
            style={{alignSelf: 'stretch', height: 300}}
            showinfo
            controls={1}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 70,
            }}>
            <View style={styles.LoopButton}>
              <Button
                title={this.state.loop ? 'Looping' : 'Not Looping'}
                onPress={() => {
                  this.setState(state => ({loop: !state.loop}));
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.LoopButton, {marginRight: 10}]}>
                <Button
                  title="Previous"
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.previousVideo();
                    }
                  }}
                />
              </View>
              <View style={styles.LoopButton}>
                <Button
                  title="Next"
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.nextVideo();
                    }
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <View style={styles.LoopButton}>
                <Button
                  title="15s"
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(15);
                    }
                  }}
                />
              </View>
              <View
                style={[styles.LoopButton, {marginLeft: 10, marginRight: 10}]}>
                <Button
                  title="2 Min"
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(2 * 60);
                    }
                  }}
                />
              </View>
              <View style={styles.LoopButton}>
                <Button
                  title="15 Min"
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(15 * 60);
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  LoopButton: {
    marginTop: 15,
    backgroundColor: 'gold',
    height: 55,
    borderRadius: 50,
    padding: 5,
  },
});

export default withNavigationFocus(MemeRadar);
