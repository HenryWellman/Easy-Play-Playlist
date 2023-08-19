import React, { Component, createContext } from "react";
import { Text, View, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { DataProvider } from "recyclerlistview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

export const AudioContext = createContext();

export class AudioProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: null,
      playbackPosition: null,
      playbackDuration: null,
    };

    this.totalAudioCount = 0;
  }

  permissionAlert = () => {
    Alert.alert(
      "Permission Required",
      "Permission Is Required To Read Audio Files!",
      [
        {
          text: "I am ready!",
          onPress: () => this.getPermission(),
        },
        {
          text: "cancel",
          onPress: () => this.permissionAlert(),
        },
      ]
    );
  };

  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state;

    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ["audio", "video"],
    });

    media = await MediaLibrary.getAssetsAsync({
      mediaType: ["audio", "video"],
      first: media.totalCount,
    });

    this.totalAudioCount = media.totalCount;

    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
      audioFiles: [...audioFiles, ...media.assets],
    });

    //console.log(media.assets.length);
  };

  loadPreviousAudio = async () => {
    //Will load audio from asynch storage for memory purposes
    let previousAudio = await AsyncStorage.getItem("previousAudio");
    let currentAudio;
    let currentAudioIndex;

    if (previousAudio === null) {
      currentAudio = this.state.audioFiles[0];
      currentAudioIndex = 0;
    } else {
      previousAudio = JSON.parse(previousAudio);
      currentAudio = previousAudio.audio;
      currentAudioIndex = previousAudio.index;
    }

    this.setState({ ...this.state, currentAudio, currentAudioIndex });
  };

  getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    //If granted get all audio files
    if (permission.granted) {
      this.getAudioFiles();
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain) {
        //Display alert saying must allow permission to get files
        this.permissionAlert();
      }

      if (status === "granted") {
        this.getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        //Display some error to the user
        this.setState({ ...this.state, permissionError: true });
      }
    }
  };

  componentDidMount() {
    this.getPermission();
    if (this.state.playbackObj === null) {
      this.setState({ ...this.state, playbackObj: new Audio.Sound() });
    }
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState });
  };

  render() {
    const {
      audioFiles,
      dataProvider,
      permissionError,
      playbackObj,
      soundObj,
      isPlaying,
      currentAudio,
      currentAudioIndex,
      playbackPosition,
      playbackDuration,
    } = this.state;

    if (permissionError) {
      return (
        <View>
          <Text>You Need To Accept Permissions For This App To Work</Text>
        </View>
      );
    }
    return (
      <AudioContext.Provider
        value={{
          audioFiles,
          dataProvider,
          playbackObj,
          soundObj,
          currentAudio,
          isPlaying,
          currentAudioIndex,
          totalAudioCount: this.totalAudioCount,
          playbackPosition,
          playbackDuration,
          updateState: this.updateState,
          loadPreviousAudio: this.loadPreviousAudio,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
