import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Permissions, ImagePicker, Magnetometer } from 'expo';
import { connect } from 'react-redux';
import { settingIngredientsList } from '../store/pantry';
import API_KEY from '../secrets/googleAPI';
import notFood from '../utils/notFood';

class CameraScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      pantry: [],
      isLoading: false,
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  static navigationOptions = {
    title: null,
  };

  convertToText = async imageURI => {
    try {
      this.setState({ isLoading: true });
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
          'There was no readable text in your image. Please try again.'
        );
        this.setState({ isLoading: false });
      } else {
        const { uid, pantry } = this.props;
        const letters = /[A-Z]/g;
        const text = responseJSON.responses[0].fullTextAnnotation.text;
        const splitText = text.split('\n');
        const ingredients = splitText.filter(
          str =>
            str.length !== 0 && str[0].match(letters) && !notFood.includes(str)
        );
        await this.props.settingIngredientsList(
          ingredients,
          uid
        );
        Alert.alert(
          'Success!',
          'Items have been added to your pantry!',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      }
    } catch (err) {
      console.error('An error occurred during text conversion:', err);
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

    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let selectedPhoto = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });
      this.convertToText(selectedPhoto.base64);
    }
  }

  async selectPhoto() {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === 'granted') {
      let selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });
      this.convertToText(selectedPhoto.base64);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Image
            source={require('../assets/images/camera.png')}
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
            source={require('../assets/images/photo.png')}
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
    backgroundColor: '#c4e4cf',
    alignItems: 'center',
  },
  cameraContainer: {
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: '#ffffff',
    width: 350,
    height: 630,
    borderRadius: 30,
  },
  image: {
    alignItems: 'center',
    marginTop: 80,
  },
  button: {
    alignItems: 'center',
    width: 180,
    marginTop: 20,
    backgroundColor: '#c4e4cf',
    borderRadius: 30,
  },
  text: {
    fontFamily: 'Futura',
    color: 'white',
    fontSize: 30,
    padding: 5,
  },
});

const mapStateToProps = state => ({
  uid: state.user.uid,
  pantry: state.pantry.pantry,
  filteredIngredientList: state.pantry.filteredIngredientList,
});

const mapDispatchToProps = dispatch => {
  return {
    settingIngredientsList: (pantry, uid) =>
      dispatch(settingIngredientsList(pantry, uid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraScreen);
