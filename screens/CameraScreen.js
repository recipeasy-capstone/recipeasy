import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native'
import {Permissions, ImagePicker} from 'expo'

export default class CameraScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      imageURI: null
    }
  }

  static navigationOptions = {
    title: 'Camera',
  }

  takePhoto = async () => {
    const {status: cameraPerm} = await Permissions.askAsync(Permissions.CAMERA)
    const {status: cameraRollPerm} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let selectedPhoto = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      })
      this.setState({ imageURI: selectedPhoto.uri })
    }
  }

  selectPhoto = async () => {
    const {status: cameraRollPerm} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (cameraRollPerm === 'granted') {
      let selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      this.setState({ imageURI: selectedPhoto.uri })
    }
  }

  render() {
    return (
    <View style={styles.container}>
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
    backgroundColor: '#fff'
  }
})
