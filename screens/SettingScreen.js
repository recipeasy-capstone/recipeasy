import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { logout } from '../store/user';
import { fire } from '../firebaseconfig'
import { connect } from 'react-redux';

class SettingScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
  };

  handleLogout() {
    const { navigate } = this.props.navigation
    fire.auth().signOut()
    this.props.logout()
    navigate('Home')
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handleLogout()}>
          <Text>Log Out</Text>
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
  logout: () => dispatch(logout()),
});

export default connect(
  null,
  mapDispatchToProps
)(SettingScreen);
