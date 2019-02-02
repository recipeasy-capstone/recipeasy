import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert
} from "react-native";
import { Permissions, ImagePicker } from "expo";
import { connect } from "react-redux";
import { settingIngredientsList } from "../store/pantry";
import API_KEY from '../secrets/googleAPI'
import notFood from '../utils/notFood'

class CameraScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      pantry: []
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
        aspect: [4, 3],
        base64: true
      });
      this._convertToText(selectedPhoto.base64)
    }
  }

  async selectPhoto() {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === "granted") {
      let selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      });
      this._convertToText(selectedPhoto.base64)
    }
  }

  _convertToText = async (imageURI) => {
    try {
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: imageURI,
                },
                features: [
                  {
                    type: `${
                      this.props.documentMode ? 'DOCUMENT_' : ''
                    }TEXT_DETECTION`,
                    maxResults: 1,
                  },
                ],
              },
            ],
          }),
        }
      );
      const responseJSON = await response.json();
      if (
        !(
          responseJSON &&
          responseJSON.responses &&
          responseJSON.responses[0] &&
          responseJSON.responses[0].fullTextAnnotation
        )
      ) {
        Alert.alert(
          'There was no readable text in your image. Please try again.'
        );
        this.setState({ isLoading: false });
      } else {
        const { email, pantry } = this.props.user
        const food = /[A-Z]/g;
        const text = responseJSON.responses[0].fullTextAnnotation.text;
        const splitText = text.split('\n')
        const ingredients = splitText.filter(str => str.length !== 0 && str[0].match(food) && !notFood.includes(str))
        await this.props.settingIngredientsList([...pantry].concat(ingredients), email)
        Alert.alert(
          'Success!',
          'Items have been added to your pantry!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
    } catch (err) {
      console.error('An error occurred during text conversion:', err);
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
  user: state.user.user,
  filteredIngredientList: state.pantry.filteredIngredientList
});

const mapDispatchToProps = dispatch => {
  return {
    settingIngredientsList: (pantry, userId) => dispatch(settingIngredientsList(pantry, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraScreen);
