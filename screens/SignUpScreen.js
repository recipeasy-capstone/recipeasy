import React from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { signUpUser } from '../store/user'
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements'

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
        <Image source={require('../assets/images/recipeasy_logo-01.png')}
        style={styles.image}/>
        <View style={styles.signupBox}>
        <Input
          placeholder='Email'
          style={styles.form}
          onChangeText={email => this.setState({ email })}
          value={this.state.userId}
        />
        <Input
          placeholder='Password'
          style={styles.form}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={styles.buttonBox}>
         <Button
         style={styles.button}
         onPress={() => this.handleSignUp()}
         title="Sign Up"
         type="outline"
        ></Button>
        </View>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 100,
    justifyContent: 'space-evenly'
  },
  form: {
    margin: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  input: {
    marginBottom:10
  },
  image: {
    alignItems: 'center',
    margin: 15
  },
  loginBox: {
    marginTop: 20,
  },
  buttonBox: {
    padding: 10
  },
  button: {
    alignItems: 'center',
  }
});


const mapDispatchToProps = dispatch => ({
  signUpUser: (data) => dispatch(signUpUser(data))
})

export default connect(null, mapDispatchToProps)(SignUpScreen)
