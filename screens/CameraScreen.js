import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {Camera, Permissions, ImagePicker} from 'expo'


export default class CameraScreen extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  }

  async componentDidMount(){
    const {status : cameraPerm} = await Permissions.askAsync(Permissions.CAMERA)
    const {status: cameraRollPerm} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted'){
      await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4,3]
      })
    }
  }

  render() {
      return(
        <View>
        <TouchableOpacity
          style = {styles.button}
          onPress={this.takePhoto}>
          {console.log('clicked camera')}
        </TouchableOpacity>
      </View>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
