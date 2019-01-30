import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {Camera, Permissions, ImagePicker} from 'expo'
import HomeScreen from './HomeScreen'


export default class CameraScreen extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  }

  takePhoto = async()=>{
    const {status : cameraPerm} = await Permissions.askAsync(Permissions.CAMERA)
    const {status: cameraRollPerm} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted'){
      await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4,3]
      })
    }
    // this._handleImagePicked(selectedPhoto);

  }

  selectPhoto = async()=>{
    const {status: cameraRollPerm} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (cameraRollPerm === 'granted') {
      let selectedPhoto = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
      });
      // this._handleImagePicked(selectedPhoto);
  }
  }

  render() {
    const {navigate} = this.props.navigation
      return(
      <View>
        <Button
          title = "Take Photo"
          onPress = {this.takePhoto}
        />
        <Button
          title = "Select Photo"
          onPress = {this.selectPhoto}
      />
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
