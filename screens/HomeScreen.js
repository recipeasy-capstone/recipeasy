import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { login, signUpUser } from '../store/user';
import { connect } from 'react-redux';
import { fire } from '../firebaseconfig';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      data: {
        pantry: [],
        recipes: [],
        starred: [],
      },
    };
  }
  static navigationOptions = {
    title: 'Home',
  };

  handleLogin() {
    const { email, password, uid } = this.state
    fire.auth().signInWithEmailAndPassword(email, password)
      .then(ref => 
        this.props.login(req.user.uid))
      .catch(error => {
        console.error(error)
      }) 

    // const { email, password } = this.state;
    // const { navigate } = this.props.navigation;
    // if (email && password) {
    //   await this.props.login(email.toLowerCase(), password);
    //   navigate('Main');
    // } else {
    //   Alert.alert(
    //     'Alert',
    //     'Missing email or password',
    //     [{ text: 'OK', onPress: () => console.log('OK') }],
    //     { cancelable: false }
    //   );
    // }
  }
  handleSignUp() {
    const { navigate } = this.props.navigation
    const { email, password, data } = this.state
    fire.auth().createUserWithEmailAndPassword(email, password)
      .then(ref => {
        // console.log('this is the ref', ref.user.uid)
        this.props.signUpUser(ref.user.uid, data)
        navigate('Main')
      })
      .catch(error => {
        console.error(error);
      });
    // const { email, password, uid, data } = this.state;
    // const { navigate } = this.props.navigation;
    // if (email && password) {
    //   await this.props.signUpUser(email, password, data);
    //   Alert.alert(
    //     'Success!',
    //     'Created New User!',
    //     [{ text: 'OK', onPress: () => console.log('OK') }],
    //     { cancelable: false }
    //   );
    //   navigate('Main');
    // } else {
    //   Alert.alert(
    //     'Missing Field!',
    //     'Need to fill in both fields',
    //     [{ text: 'OK', onPress: () => console.log('OK') }],
    //     { cancelable: false }
    //   );
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/recipeasy_logo-01.png')}
          style={styles.image}
        />
        <View style={styles.loginBox}>
          <Input
            placeholder="Email"
            style={styles.form}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Input
            placeholder="Password"
            style={styles.form}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <View style={styles.buttonBox}>
            <Button
              style={styles.button}
              onPress={() => this.handleLogin()}
              title="Log In"
              type="outline"
            />
            <Button
              style={styles.button}
              onPress={() => this.handleSignUp()}
              title="Sign Up"
              type="outline"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 100,
    justifyContent: 'space-evenly',
  },
  image: {
    alignItems: 'center',
    margin: 15,
  },
  loginBox: {
    marginTop: 20,
  },
  form: {
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  input: {
    marginBottom: 10,
  },
  buttonBox: {
    padding: 10,
  },
  button: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  login: (uid) => dispatch(login(uid)),
  signUpUser: (uid, data) => dispatch(signUpUser(uid, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
