import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator
} from "react-native";
import { Permissions, ImagePicker } from "expo";
import { connect } from "react-redux";
import { settingIngredientsList } from "../store/pantry";
import API_KEY from "../secrets/googleAPI";
import notFood from "../utils/notFood";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import autocorrect from "../utils/autocorrect";

class CameraScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      pantry: [],
      isLoading: false
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  static navigationOptions = {
    title: "Camera"
  };

  convertToText = async imageURI => {
    try {
      this.setState({ isLoading: true });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: imageURI
                },
                features: [
                  {
                    type: `${
                      this.props.documentMode ? "DOCUMENT_" : ""
                    }TEXT_DETECTION`,
                    maxResults: 1
                  }
                ]
              }
            ]
          })
        }
      );
      let responseJSON = await response.json();
      if (
        !(
          responseJSON &&
          responseJSON.responses &&
          responseJSON.responses[0] &&
          responseJSON.responses[0].fullTextAnnotation
        )
      ) {
        Alert.alert(
          "There was no readable text in your image. Please try again."
        );
        this.setState({ isLoading: false });
      } else {
        const { uid } = this.props;
        const text = responseJSON.responses[0].fullTextAnnotation.text;
        const splitText = text.split("\n");

        const filteredIngredients = splitText.filter(
          word => word.length !== 0 && !notFood.includes(word) && !word[0].match(/[^a-zA-Z]+/g)
        );

        const ingredients = filteredIngredients.map(item => 
          item.toLowerCase().replace(/[^a-zA-Z ]+/g, "")
        );

        console.log('INGREDIENTS', ingredients)
        
        await this.props.settingIngredientsList(ingredients, uid);
        Alert.alert(
          "Success!",
          "Please review your pantry to assure everything added correctly!",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch (err) {
      console.error("An error occurred during text conversion:", err);
    } finally {
      this.setState({ isLoading: false });
    }
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
      this.convertToText(selectedPhoto.base64);
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
      this.convertToText(selectedPhoto.base64);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Image
            source={require("../assets/images/camera.png")}
            style={styles.image}
          />
          <TouchableOpacity style={styles.button} onPress={this.takePhoto}>
            <Text style={styles.text}>take photo</Text>
          </TouchableOpacity>

          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="#0000ff"
          />

          <Image
            source={require("../assets/images/photo.png")}
            style={styles.image}
          />
          <TouchableOpacity style={styles.button} onPress={this.selectPhoto}>
            <Text style={styles.text}>select photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c4e4cf",
    alignItems: "center"
  },
  cameraContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: 30,
    width: wp("85%"),
    height: hp("75%"),
    borderRadius: 10
  },
  image: {
    alignItems: "center",
    marginTop: hp("10%")
  },
  button: {
    alignItems: "center",
    width: wp("50%"),
    marginTop: hp("3%"),
    backgroundColor: "#c4e4cf",
    borderRadius: 10
  },
  text: {
    fontFamily: "Futura",
    color: "white",
    fontSize: hp("3%"),
    padding: 5
  }
});

const mapStateToProps = state => ({
  uid: state.user.uid,
  pantry: state.pantry.pantry,
  filteredIngredientList: state.pantry.filteredIngredientList
});

const mapDispatchToProps = dispatch => {
  return {
    settingIngredientsList: (ingredients, uid) =>
      dispatch(settingIngredientsList(ingredients, uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraScreen);
