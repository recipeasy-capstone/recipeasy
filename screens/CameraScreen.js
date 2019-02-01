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
      ingredients: []
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  static navigationOptions = {
    title: "Camera"
  };

  async takePhoto() {
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
      await this.props.fetchIngredientsList(selectedPhoto);
    }
  }

  async selectPhoto() {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === "granted") {
      let selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      await this.props.fetchIngredientsList(selectedPhoto);
      console.log(selectedPhoto);
    }
  }

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
  user: state.user.user,
  filteredIngredientList: state.pantry.filteredIngredientList
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
