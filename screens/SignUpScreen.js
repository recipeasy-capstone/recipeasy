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
          'New to fill in both forms',
          [
            {text: 'OK', onPress: () => console.log('OK')},
          ],
          {cancelable: false},
        );
          navigate('Main')
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
        <TouchableOpacity onPress={() => this.handleSignUp()}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 100,
  },
  form: {
    borderWidth: 2,
    borderColor: 'black',
  },
});


const mapDispatchToProps = dispatch => ({
  signUpUser: (data) => dispatch(signUpUser(data))
})

export default connect(null, mapDispatchToProps)(SignUpScreen)