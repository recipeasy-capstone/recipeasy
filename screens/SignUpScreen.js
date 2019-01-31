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
      <View style={styles.container}>
        <Text>SIGNUP</Text>
        <TouchableOpacity onPress={() => navigate('Main')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 100,
  },
});
