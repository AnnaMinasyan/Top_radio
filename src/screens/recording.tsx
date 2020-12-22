import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,

  } from 'react-native-audio-recorder-player';
  import {
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,

  } from 'react-native';
  import React, { Component } from 'react';

import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const styles: any = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#455A64',
      flexDirection: 'column',
      alignItems: 'center',
    },
    titleTxt: {
      marginTop: 100 ,
      color: 'white',
      fontSize: 28 ,
    },
    viewRecorder: {
      marginTop: 40 ,
      width: '100%',
      alignItems: 'center',
    },
    recordBtnWrapper: {
      flexDirection: 'row',
    },
    viewPlayer: {
      marginTop: 60 ,
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    viewBarWrapper: {
      marginTop: 28 ,
      marginHorizontal: 28,
      alignSelf: 'stretch',
    },
    viewBar: {
      backgroundColor: '#ccc',
      height: 4 ,
      alignSelf: 'stretch',
    },
    viewBarPlay: {
      backgroundColor: 'white',
      height: 4 ,
      width: 0,
    },
    playStatusTxt: {
      marginTop: 8,
      color: '#ccc',
    },
    playBtnWrapper: {
      flexDirection: 'row',
      marginTop: 40 ,
    },
    btn: {
      borderColor: 'white',
      borderWidth: 1,
    },
    txt: {
      color: 'white',
      fontSize: 14 ,
      marginHorizontal: 8 ,
      marginVertical: 4 ,
    },
    txtRecordCounter: {
      marginTop: 32 ,
      color: 'white',
      fontSize: 20 ,
      textAlignVertical: 'center',
      fontWeight: '200',
      fontFamily: 'Helvetica Neue',
      letterSpacing: 3,
    },
    txtCounter: {
      marginTop: 12,
      color: 'white',
      fontSize: 20 ,
      textAlignVertical: 'center',
      fontWeight: '200',
      fontFamily: 'Helvetica Neue',
      letterSpacing: 3,
    },
  });
  
  interface State {
    isLoggingIn: boolean;
    recordSecs: number;
    recordTime: string;
    currentPositionSec: number;
    currentDurationSec: number;
    playTime: string;
    duration: string;
  }
  
  class Page extends Component<any, State> {
    private audioRecorderPlayer: AudioRecorderPlayer;
  
    constructor(props: any) {
      super(props);
      this.state = {
        isLoggingIn: false,
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
      };
  
      this.audioRecorderPlayer = new AudioRecorderPlayer();
      this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }
  
    public render() {
      let playWidth =
        (this.state.currentPositionSec / this.state.currentDurationSec) *
        (56);
      if (!playWidth) playWidth = 0;
  
      return (
        <View style={styles.container}>
          <Text style={styles.titleTxt}>TITLE</Text>
          <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
          <View style={styles.viewRecorder}>
            <View style={styles.recordBtnWrapper}>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.onStartRecord}

              >
               <Text>RECORD</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    marginLeft: 12 ,
                  },
                ]}
                onPress={this.onStopRecord}

              >
                <Text>stop</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewPlayer}>
            <TouchableOpacity
              style={styles.viewBarWrapper}
              onPress={this.onStatusPress}
            >
              <View style={styles.viewBar}>
                <View style={[styles.viewBarPlay, { width: playWidth }]} />
              </View>
            </TouchableOpacity>
            <Text style={styles.txtCounter}>
              {this.state.playTime} / {this.state.duration}
            </Text>
            <View style={styles.playBtnWrapper}>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.onStartPlay}

              >
               <Text>PLAY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    marginLeft: 12 ,
                  },
                ]}
                onPress={this.onPausePlay}

              >
                <Text>PAUSE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    marginLeft: 12,
                  },
                ]}
                onPress={this.onStopPlay}
              >
        <Text>STOP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  
    private onStatusPress = (e: any) => {
      const touchX = e.nativeEvent.locationX;
      console.log(`touchX: ${touchX}`);
      const playWidth =
        (this.state.currentPositionSec / this.state.currentDurationSec) *
        (56);
      console.log(`currentPlayWidth: ${playWidth}`);
  
      const currentPosition = Math.round(this.state.currentPositionSec);
      console.log(`currentPosition: ${currentPosition}`);
  
      if (playWidth && playWidth < touchX) {
        const addSecs = Math.round(currentPosition + 1000);
        this.audioRecorderPlayer.seekToPlayer(addSecs);
        console.log(`addSecs: ${addSecs}`);
      } else {
        const subSecs = Math.round(currentPosition - 1000);
        this.audioRecorderPlayer.seekToPlayer(subSecs);
        console.log(`subSecs: ${subSecs}`);
      }
    };
    dowloadFile(url: string) {
      const localFile = `${RNFS.DocumentDirectoryPath}/t.mp4`;


      const options = {
        fromUrl: url,
        toFile: localFile
      };
      RNFS.downloadFile(options).promise
          .then(() => {
            console.log("kdcvklscjsdpspov"),
            FileViewer.open(localFile)

    })
          .then(() => {

          })
          .catch(error => {
            // error
          });
      this.selectFileTapped()
    }
    async  selectFileTapped() {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        console.log(
            "fjkjfkdjdl",res
        );
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }

    }
    private onStartRecord = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your storage to write a file',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the storage');
          } else {
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }

      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your storage to write a file',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
      console.log(RNFS.DownloadDirectoryPath)
      const path = `${RNFS.DownloadDirectoryPath}/TopRadio${Date.now()}.aac`
   //   const path=`/storage/emulated/0/Download/kkkkk.aac`
      const audioSet: AudioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };


      const uri = await this.audioRecorderPlayer.startRecorder(path,true,audioSet);
      console.log(";;;;;;;;;;;;;;",uri)

      this.audioRecorderPlayer.addRecordBackListener((e: any) => {
        this.setState({
          recordSecs: e.current_position,
          recordTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
        });
      });
      console.log(`uri: ${uri}`);
    };
  
    private onStopRecord = async () => {
      const result = await this.audioRecorderPlayer.stopRecorder();
      this.audioRecorderPlayer.removeRecordBackListener();
      this.setState({
        recordSecs: 0,
      });
   //   this.dowloadFile(result)
      console.log("result",result);
    };
  
    private onStartPlay = async () => {
      console.log('onStartPlay');
      // const path = Platform.select({
      //       //   ios: 'hello.m4a',
      //       //   android: 'sdcard/hello.mp4',
      //       // });
      const path=`${RNFS.DocumentDirectoryPath}/temporaryfile.aac`
      const msg = await this.audioRecorderPlayer.startPlayer(path);
      this.audioRecorderPlayer.setVolume(1.0);
      console.log(msg);
      this.audioRecorderPlayer.addPlayBackListener((e: any) => {
        if (e.current_position === e.duration) {
          console.log('finished');
          this.audioRecorderPlayer.stopPlayer();
        }
        this.setState({
          currentPositionSec: e.current_position,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    };
  
    private onPausePlay = async () => {
      await this.audioRecorderPlayer.pausePlayer();
    };
  
    private onStopPlay = async () => {
      console.log('onStopPlay');
      this.audioRecorderPlayer.stopPlayer();
      this.audioRecorderPlayer.removePlayBackListener();
    };
  }
  
  export default Page;
  