import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import YouTube from 'react-native-youtube';
import {withNavigationFocus} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {compose} from 'redux';
import APIKEY from '../Keys/ApiKey';
import {getIndex} from '../store/actions/VideosActions';
import {bindActionCreators} from 'redux';

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

class MemeRadar extends React.Component {
  state = {
    play: false,
    loop: false,
    videosPlayed: [],
    sendAction: false,
    indexId: 0,
    landScapeOrientation: false,
  };

  onLayout(e) {
    const {width, height} = Dimensions.get('window');
    console.log(width, height);
    if (width > 415) {
      console.log('LandScape Mode');
      this.setState({landScapeOrientation: true});
    } else {
      this.setState({
        landScapeOrientation: false,
      });
    }
  }

  _youTubeRef = React.createRef();

  async componentDidMount() {
    this.setState({
      videoIds: videoIdsList,
      play: true,
      resetAsyncStorage: false,
    });
  }

  handleShouldComponentUpdate = async () => {
    await this._youTubeRef.current
      .getVideosIndex()
      .then(index => {
        this.setState({
          indexId: index,
        });
        console.log(index);
      })
      .catch(error => console.log(error));
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.indexId === nextState.indexId) {
      return true;
    } else {
      return false;
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({
        //play: this.state.play === false ? true : false,
        play: this.state.play === true ? false : true,
      });
    }
    if (this.state.indexId !== prevState.indexId) {
      console.log('Im in');
      try {
        if (this._youTubeRef.current._isReady) {
          await this._youTubeRef.current
            .getVideosIndex()
            .then(index => {
              this.state.videosPlayed.includes(index) || null
                ? null
                : this.handleUpdate(index);
            })
            .catch(err => console.log(err));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleUpdate = index => {
    this.props.getIndex(index);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
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
                height: this.state.landScapeOrientation ? 350 : 300,
                marginLeft: this.state.landScapeOrientation ? 1 : null,
                marginTop: this.state.landScapeOrientation ? 5 : null,
                marginRight: this.state.landScapeOrientation ? 3 : null,
              }}
              showinfo
              controls={1}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: this.state.landScapeOrientation ? 8 : 60,
                flexDirection: this.state.landScapeOrientation ? 'row' : null,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[
                    styles.LoopButton,
                    {
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
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
                  style={[
                    styles.LoopButton,
                    {
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
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
                  style={[
                    styles.LoopButton,
                    {
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
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
                  marginTop: this.state.landScapeOrientation ? null : 10,
                }}>
                <TouchableOpacity
                  style={[
                    styles.LoopButton,
                    {
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
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
                  style={[
                    styles.LoopButton,
                    {
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
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
                  style={[
                    styles.LoopButton,
                    {
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
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

const mapstateToProps = state => {
  return {
    videos: state.Videos,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({getIndex}, dispatch);
}

export default compose(
  connect(mapstateToProps, mapDispatchToProps),
  withNavigationFocus,
)(MemeRadar);
