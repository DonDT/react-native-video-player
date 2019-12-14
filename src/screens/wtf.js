import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
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
      loop: false,
      landScapeOrientation: false,
    };
  }

  _youTubeRef = React.createRef();

  componentDidMount() {
    this.setState({
      videoIds: videoIdsList,
      play: false,
      landScapeOrientation: false,
    });
  }

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({
        play: this.state.play === false ? true : false,
      });
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container} onLayout={this.onLayout.bind(this)}>
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
                height: 300,
                marginLeft: this.state.landScapeOrientation ? 30 : null,
                marginRight: this.state.landScapeOrientation ? 35 : null,
                marginTop: this.state.landScapeOrientation ? 5 : null,
              }}
              showinfo
              controls={1}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: this.state.landScapeOrientation ? 7 : 60,
                flexDirection: this.state.landScapeOrientation ? 'row' : null,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[
                    styles.LoopButton,
                    {
                      marginRight: 10,
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.previousVideo();
                    }
                  }}>
                  <View>
                    <Text style={{fontSize: 10, color: 'violet'}}>
                      Previous
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.LoopButton,
                    {
                      marginRight: 10,
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
                  onPress={() => {
                    this.setState(state => ({loop: !state.loop}));
                  }}>
                  <View>
                    <Text style={{fontSize: 10, color: 'violet'}}>
                      {this.state.loop ? 'Loop' : 'No Loop'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.LoopButton,
                    {
                      marginRight: 10,
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.nextVideo();
                    }
                  }}>
                  <View>
                    <Text style={{fontSize: 10, color: 'violet'}}>Next</Text>
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
                      marginRight: 10,
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(15);
                    }
                  }}>
                  <View>
                    <Text style={{fontSize: 10, color: 'violet'}}>15s</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.LoopButton,
                    {
                      marginRight: 10,
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(2 * 60);
                    }
                  }}>
                  <View>
                    <Text style={{fontSize: 10, color: 'violet'}}>2 Min</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.LoopButton,
                    {
                      marginRight: 10,
                      height: this.state.landScapeOrientation ? 25 : 40,
                      padding: this.state.landScapeOrientation ? 7 : 8,
                    },
                  ]}
                  onPress={() => {
                    if (this._youTubeRef.current) {
                      this._youTubeRef.current.seekTo(5 * 60);
                    }
                  }}>
                  <View>
                    <Text style={{fontSize: 10, color: 'violet'}}>5 Min</Text>
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
  },
});

export default withNavigationFocus(Wtf);
