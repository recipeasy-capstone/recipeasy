import React from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles'
import { Input, Button } from 'react-native-elements';
import { login, signUpUser } from '../store/user';
import { connect } from 'react-redux';
import { fire } from '../firebaseconfig';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: '',
      data: {
        pantry: [],
        starred: [],
      },
    };
  }
  static navigationOptions = {
    title: 'Home',
  };

  handleLogin() {
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(ref => {
        this.props.login(ref.user.uid);
        navigate('Main');
      })
      .catch(error => {
        alert('Either your email or password is incorrect');
      });
  }

  handleSignUp() {
    const { navigate } = this.props.navigation;
    const { email, password, data } = this.state;
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ref => {
        await this.props.signUpUser(ref.user.uid, data);
        navigate('Main');
      })
      .catch(error => {
        if ((email && !password) || (!email && password)) {
          alert('Both fields must be filled!');
        } else if (password.length < 6) {
          alert('Password must be at least six characters');
        } else if (email && password) {
          alert('This email is already being used!');
        }
      });
  }

  render() {
    return (
      <View>
        <View style={styles.homeContainer}>
          <KeyboardAvoidingView behavior="position" style={styles.container}>
            <Image
              source={require('../assets/images/recipeasy_logo-01.png')}
              style={styles.homeImage}
            />
            <View style={styles.loginBox}>
              <Input
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
              <Input
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
                value={this.state.password.replace(/./g, '*')}
              />
              <View style={styles.buttonBox}>
                <Button
                  onPress={() => this.handleLogin()}
                  title="Log In"
                  type="outline"
                />
                <Button
                  onPress={() => this.handleSignUp()}
                  title="Sign Up"
                  type="outline"
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: uid => dispatch(login(uid)),
  signUpUser: (uid, data) => dispatch(signUpUser(uid, data)),
});

export default connect(
  null,
  mapDispatchToProps
)(HomeScreen);
