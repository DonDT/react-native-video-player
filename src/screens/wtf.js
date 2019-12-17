import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import YouTube from 'react-native-youtube';
import {withNavigationFocus} from 'react-navigation';
import APIKEY from '../Keys/ApiKey';

let videoIdsList = ['ErfEnD2WA3A', 'JZnlJ2upJv8', 'Km8kIX-8hVs'];

class Wtf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      loop: true,
      landScapeOrientation: false,
    };
  }

  _youTubeRef = React.createRef();

  componentDidMount() {
    this.setState({
      videoIds: videoIdsList,
      play: true,
      landScapeOrientation: false,
    });
  }

  onLayout(e) {
    const {width, height} = Dimensions.get('window');
    if (width > 415) {
      this.setState({landScapeOrientation: true});
    } else {
      this.setState({
        landScapeOrientation: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({
        play: this.state.play === true ? false : true,
      });
    }
  }

  render() {
    const {landScapeOrientation} = this.state;
    const orientationStyles = {
      height: landScapeOrientation ? 25 : 40,
      padding: landScapeOrientation ? 7 : 8,
    };
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: landScapeOrientation ? 'black' : null},
        ]}>
        <ScrollView>
          <View onLayout={this.onLayout.bind(this)}>
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
              style={{
                alignSelf: 'stretch',
                height: landScapeOrientation ? 350 : 300,
                marginLeft: landScapeOrientation ? 1 : null,
                marginTop: landScapeOrientation ? 5 : null,
                marginRight: landScapeOrientation ? 3 : null,
              }}
              showinfo
              controls={1}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: landScapeOrientation ? 8 : 60,
                flexDirection: landScapeOrientation ? 'row' : null,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[styles.LoopButton, orientationStyles]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.previousVideo();
                    }
                  }}>
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
                    <Text style={{fontSize: 10, color: '#ff00bf'}}>
                      Previous
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.LoopButton, orientationStyles]}
                  onPress={() => {
                    this.setState(state => ({loop: !state.loop}));
                  }}>
                  <View style={styles.controlIcons}>
                    <Text style={{fontSize: 10, color: '#ff00bf'}}>
                      {this.state.loop ? 'Loop' : 'No Loop'}
                    </Text>
                    <Image
                      style={styles.ImageStyle}
                      source={require('../Images/update-arrows.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.LoopButton, orientationStyles]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.nextVideo();
                    }
                  }}>
                  <View style={styles.controlIcons}>
                    <Text style={{fontSize: 10, color: '#ff00bf'}}>Next</Text>
                    <Image
                      style={styles.ImageStyle}
                      source={require('../Images/right-arrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: landScapeOrientation ? null : 10,
                }}>
                <TouchableOpacity
                  style={[styles.LoopButton, orientationStyles]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(15);
                    }
                  }}>
                  <View style={styles.controlIcons}>
                    <Text style={{fontSize: 10, color: '#ff00bf'}}>15s</Text>
                    <Image
                      style={styles.ImageStyle}
                      source={require('../Images/fast-forward.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.LoopButton, orientationStyles]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(2 * 60);
                    }
                  }}>
                  <View style={styles.controlIcons}>
                    <Text style={{fontSize: 10, color: '#ff00bf'}}>2 Min</Text>
                    <Image
                      style={styles.ImageStyle}
                      source={require('../Images/fast-forward.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.LoopButton, orientationStyles]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(5 * 60);
                    }
                  }}>
                  <View style={styles.controlIcons}>
                    <Text style={{fontSize: 10, color: '#ff00bf'}}>5 Min</Text>
                    <Image
                      style={styles.ImageStyle}
                      source={require('../Images/fast-forward.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    marginLeft: 5,
  },
});

export default withNavigationFocus(Wtf);
