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
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>easy peasy recipeasy</Text>
        <TouchableOpacity onPress={() => navigate('Main')}>
          <Text>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('SignUp')}>
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
