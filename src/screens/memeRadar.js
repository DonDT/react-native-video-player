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
    getOriginalPlaylist: false,
    disableNextButton: false,
    indexedVideo: 0,
    originalPlayList: false,
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
    }

    if (this.state.status !== nextState.status) {
      {
        if (this._youTubeRef.current._isReady) {
          await this._youTubeRef.current
            .getVideosIndex()
            .then(index => {
              console.log(index);
              this.setState({
                indexedVideo: index,
              });

              if (this.state.indexedVideo !== nextState.indexedVideo) {
                this.setState({
                  disableNextButton: false,
                  originalPlayList: false,
                });
              }

              this.state.videosPlayed.includes(index) || null
                ? null
                : this.handleUpdate(index);
              console.log('Updated');
              if (this.props.Indexes.CompleteIndexArray) {
                if (this.props.Indexes.CompleteIndexArray.length) {
                  this.setState({
                    videosPlayed: [],
                  });
                }
              }
            })
            .catch(err => console.log(err));
        }

        return true;
      }
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
          if (id === 'BgZh5T4nG_w') {
            this.setState({
              indexArray: [],
              disableNextButton: true,
              originalPlayList: true,
            });
          }
          this.props.getIndex(id);
          this.handleResets();
        },
      );
    }
  };

  handleResets = () => {
    this.props.resetIndex();
  };

  bringBackOriginalPlayList = () => {
    this.setState({
      newPlayListids: [],
    });
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
                  style={[styles.Button, orientationStyles]}
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
                      PreviouS
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.Button, orientationStyles]}
                  onPress={() => {
                    this.setState(state => ({loop: !state.loop}));
                  }}>
                  <View style={styles.controlIcons}>
                    <Text style={{fontSize: 10, color: '#ff00bf'}}>
                      {this.state.loop ? 'LooP' : 'No LooP'}
                    </Text>
                    <Image
                      style={styles.ImageStyle}
                      source={require('../Images/update-arrows.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.nextButtonStyle,
                    orientationStyles,
                    {
                      backgroundColor: this.state.disableNextButton
                        ? '#fffacd'
                        : 'gold',
                    },
                  ]}
                  disabled={this.state.disableNextButton}
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
                  marginTop: landScapeOrientation ? null : 10,
                }}>
                <TouchableOpacity
                  style={[styles.Button, orientationStyles]}
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
                  style={[styles.Button, orientationStyles]}
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
                  style={[styles.Button, orientationStyles]}
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
              {this.state.originalPlayList && (
                <View style={styles.originalPlayListButton}>
                  <TouchableOpacity
                    style={[styles.Button, orientationStyles]}
                    onPress={() => this.bringBackOriginalPlayList()}>
                    <View style={styles.controlIcons}>
                      <Text style={{fontSize: 10, color: '#ff00bf'}}>
                        Original PlayList ?
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
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
  nextButtonStyle: {
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  originalPlayListButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
