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
import {withNavigationFocus} from 'react-navigation';
import APIKEY from '../Keys/ApiKey';
import YouTube from 'react-native-youtube';
import ReusableBottonControl from '../components/reusableBottonControl';
import fastForwad from '../Images/fast-forward.png';
import updateArrow from '../Images/update-arrows.png';
import leftArrow from '../Images/left-arrow.png';

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

  _youTubeRef = React.createRef();

  componentDidMount() {
    this.setState({
      videoIds: videoIdsList,
      play: true,
    });
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isFocused !== nextProps.isFocused) {
      this.setState({
        play: this.state.play === true ? false : true,
      });
      return false;
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
                <ReusableBottonControl
                  landScapeOrientation={landScapeOrientation}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.previousVideo();
                    }
                  }}
                  textTitle="PreviouS"
                  icon={leftArrow}
                />
                <ReusableBottonControl
                  landScapeOrientation={landScapeOrientation}
                  onPress={() => {
                    this.setState(state => ({loop: !state.loop}));
                  }}
                  textTitle={this.state.loop ? 'LooP' : 'No LooP'}
                  icon={updateArrow}
                />
                <TouchableOpacity
                  style={[styles.Button, orientationStyles]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.nextVideo();
                    }
                  }}>
                  <View style={styles.controlIcons}>
                    <Text style={{fontSize: 10, color: '#ff00bf'}}>NexT</Text>
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
                <ReusableBottonControl
                  landScapeOrientation={landScapeOrientation}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(15);
                    }
                  }}
                  textTitle="15s"
                  icon={fastForwad}
                />
                <ReusableBottonControl
                  landScapeOrientation={landScapeOrientation}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(2 * 60);
                    }
                  }}
                  textTitle="2 Min"
                  icon={fastForwad}
                />
                <ReusableBottonControl
                  landScapeOrientation={landScapeOrientation}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(5 * 60);
                    }
                  }}
                  textTitle="5 Min"
                  icon={fastForwad}
                />
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
  },
  ImageStyle: {
    width: 9,
    height: 9,
    tintColor: '#ff00bf',
    marginLeft: 5,
  },
});

export default withNavigationFocus(Wtf);
