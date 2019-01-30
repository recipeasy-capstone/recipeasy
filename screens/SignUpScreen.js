import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>SIGNUP</Text>
        //form
        <TouchableOpacity onPress={() => navigate('Home')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
