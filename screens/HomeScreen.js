import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { login, signUpUser } from "../store/user";
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      password: null
    };
  }
  static navigationOptions = {
    title: "Home"
  };

  async handleLogin() {
    const { userId, password } = this.state;
    const { navigate } = this.props.navigation;
    if (userId && password) {
      await this.props.login(userId.toLowerCase(), password);
      navigate("Main");
    } else {
      Alert.alert("Alert", "Missing email or password", [{ text: "OK" }], {
        cancelable: false
      });
    }
  }

  render() {
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
        <TouchableOpacity onPress={() => this.handleLogin()}>
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("SignUp")}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 100
  },
  form: {
    borderWidth: 2,
    borderColor: "black"
  }
});

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  login: (userId, password) => dispatch(login(userId, password)),
  signUp: data => dispatch(signUpUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
