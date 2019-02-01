import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { signUpUser } from '../store/user'
import { connect } from 'react-redux';
import { Button } from 'react-native-elements'

class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      pantry: [],
      password: null,
      recipes: [],
      starred: []
    };
  }
  static navigationOptions = {
    title: 'Signup',
  };

  async handleSignUp() {
    try {
      const { email, password } = this.state
      console.log('signupuser', this.props.signUpUser)
      const { navigate } = this.props.navigation
      if (email && password) {
        await this.props.signUpUser(this.state)
        Alert.alert(
        'Success!',
        'Created New User!',
        [
          {text: 'OK', onPress: () => console.log('OK')},
        ],
        {cancelable: false},
      );
        navigate('Main')
      }
      else{
        Alert.alert(
          'Missing Field!',
          'Need to fill in both forms',
          [
            {text: 'OK', onPress: () => console.log('OK')},
          ],
          {cancelable: false},
        );
        }
      }
     catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Email</Text>
        <TextInput
          style={styles.form}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        >
        </TextInput>
        <Text>Password</Text>
        <TextInput
          style={styles.form}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        >
        </TextInput>
        <Button
        style={styles.button}
        title = 'Sign Up'
        onPress={() => this.handleSignUp()}
        type = 'outline'>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 100,
    justifyContent: 'space-evenly'
  },
  form: {
    borderWidth: 1
  },
  button: {
    borderWidth: 2
  }
});


const mapDispatchToProps = dispatch => ({
  signUpUser: (data) => dispatch(signUpUser(data))
})

export default connect(null, mapDispatchToProps)(SignUpScreen)
