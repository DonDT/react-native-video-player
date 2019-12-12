import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import YouTube from 'react-native-youtube';
import {withNavigationFocus} from 'react-navigation';
import APIKEY from '../Keys/ApiKey';

let videoIdsList = [
  'QSqIG5Dl-SM',
  'jM0GePXOdT0',
  'exLTGu_c5fs',
  'Km8kIX-8hVs',
  //'c9EOCt9kkUo',
  '-goTfMUabxc',
  'y7pZzp99Jgs',
  '85RhW75xM8U',
  'URLyBDYHoGo',
];

class Lol extends Component {
  state = {
    play: false,
    // isFocused: false,
  };

  _youTubeRef = React.createRef();

  componentDidMount() {
    this.setState({
      videoIds: videoIdsList,
      play: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({
        //play: this.state.play == false ? true : false,
        play: this.state.play === false ? true : false,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <YouTube
          apiKey={APIKEY}
          videoIds={this.state.videoIds}
          play={this.state.play}
          fullscreen={false}
          ref={this._youTubeRef}
          loop={true}
          onReady={e => this.setState({isReady: true})}
          onChangeState={e => this.setState({status: e.state})}
          onChangeQuality={e => this.setState({quality: e.quality})}
          onError={e => this.setState({error: e.error})}
          style={{alignSelf: 'stretch', height: 300}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withNavigationFocus(Lol);
