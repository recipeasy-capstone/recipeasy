import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>INITIAL</Text>
        //form
        <TouchableOpacity onPress={() => navigate('Pantry')}>
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('SignUp')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
