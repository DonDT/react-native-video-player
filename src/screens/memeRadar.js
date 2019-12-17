import React from 'react';
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
import {connect} from 'react-redux';
import {compose} from 'redux';
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

class MemeRadar extends React.Component {
  state = {
    play: false,
    loop: true,
    videosPlayed: [],
    indexArray: [],
    landScapeOrientation: false,
    newPlayListids: [],
  };

  // Checking Orientation
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
    this.setState(
      {
        videoIds: videoIdsList,
        play: true,
        IndexesFromRedux: this.props.Indexes.Indexes,
      },
      () => {
        if (this.state.IndexesFromRedux.length > 1) {
          let newVideoIds = videoIdsList.slice(
            this.state.IndexesFromRedux.length - 1,
          );
          this.setState({
            newPlayListids: newVideoIds,
          });
        }
      },
    );
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isFocused !== nextProps.isFocused) {
      this.setState({
        play: this.state.play === true ? false : true,
      });

      return false;
    } else {
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
      return true;
    }
  }

  handleUpdate = index => {
    this.setState({videosPlayed: [...this.state.videosPlayed, index]});

    if (this.state.indexArray.includes(index) || index === -1) {
    } else {
      this.setState(
        {
          indexArray: [...this.state.indexArray, index],
        },
        () => {
          const id = this._youTubeRef.current.props.videoIds[index];
          this.props.getIndex(id);
          this.handleResets();
        },
      );
    }
  };

  handleResets = () => {
    this.props.resetIndex();
  };

  render() {
    const {newPlayListids} = this.state;
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
              videoIds={
                newPlayListids.length > 1 ? newPlayListids : this.state.videoIds
              }
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

mapstateToProps = state => {
  return {
    Indexes: state.Indexes,
  };
};

mapDispatchToProps = dispatch => {
  return {
    getIndex: index => dispatch({type: 'SAVE_INDEX', payload: index}),
    resetIndex: index => dispatch({type: 'RESET_INDEX', payload: ''}),
  };
};

const wrapper = compose(
  connect(mapstateToProps, mapDispatchToProps),
  withNavigationFocus,
);

export default wrapper(MemeRadar);
