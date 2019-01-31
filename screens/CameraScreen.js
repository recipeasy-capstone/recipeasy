import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { Permissions, ImagePicker } from "expo";
import { connect } from "react-redux";
import { fetchIngredientsList } from "../store/pantry";

class CameraScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      imageURI: null
    };
  }

  static navigationOptions = {
    title: "Camera"
  };

  takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      let selectedPhoto = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      this.setState({ imageURI: selectedPhoto.uri });
      await fetchIngredientsList(selectedPhoto.uri);
    }
  };

  selectPhoto = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === "granted") {
      let selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      this.setState({ imageURI: selectedPhoto.uri });
      await fetchIngredientsList(selectedPhoto.uri);
      console.log("FETCHED PHOTO\n\n", selectedPhoto.uri);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Take Photo" onPress={this.takePhoto} />
        <Button title="Select Photo" onPress={this.selectPhoto} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => {
  return {
    fetchIngredientsList: imageURI => dispatch(fetchIngredientsList(imageURI))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraScreen);
