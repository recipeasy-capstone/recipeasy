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

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      pantry: [],
      password: null,
      recipes: [],
      starred: [],
    };
  }
  static navigationOptions = {
    title: 'Home',
  };

  async handleLogin() {
    const { userId, password } = this.state;
    const { navigate } = this.props.navigation;
    if (userId && password) {
      await this.props.login(userId.toLowerCase(), password);
      navigate('Main');
    } else {
      Alert.alert(
        'Alert',
        'Missing email or password',
        [{ text: 'OK', onPress: () => console.log('OK') }],
        { cancelable: false }
      );
    }
  }
  async handleSignUp() {
    try {
      const { userId, password } = this.state;
      const { navigate } = this.props.navigation;
      if (userId && password) {
        await this.props.signUpUser(this.state);
        Alert.alert(
          'Success!',
          'Created New User!',
          [{ text: 'OK', onPress: () => console.log('OK') }],
          { cancelable: false }
        );
        navigate('Main');
      } else {
        Alert.alert(
          'Missing Field!',
          'Need to fill in both forms',
          [{ text: 'OK', onPress: () => console.log('OK') }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error(error);
    }
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
            onChangeText={userId => this.setState({ userId })}
            value={this.state.userId}
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
  login: (userId, password) => dispatch(login(userId, password)),
  signUpUser: data => dispatch(signUpUser(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
