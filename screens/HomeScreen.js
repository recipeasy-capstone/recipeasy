import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      password: null,
    };
  }
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    console.log(this.state);
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Email</Text>
        <TextInput
          style={styles.form}
          onChangeText={userId => this.setState({ userId })}
          value={this.state.userId}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.form}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        //on login retrieve data
        <TouchableOpacity onPress={() => navigate('Main')}>
          <Text>Log In</Text>
        </TouchableOpacity>
        // on signup add data
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
  form: {
    borderWidth: 2,
    borderColor: 'black',
  },
});
