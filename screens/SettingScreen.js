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
import { fire } from '../firebaseconfig';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class SettingScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  handleLogout() {
    const { navigate } = this.props.navigation;
    fire.auth().signOut();
    this.props.logout();
    navigate('Home');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logout}>
          <Image
            source={require('../assets/images/logout.png')}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('Home')}
          >
            <Text style={styles.text}>log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4e4cf',
    alignItems: 'center',
  },
  logout: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 30,
    width: wp('85%'),
    height: hp('75%'),
    borderRadius: 10,
  },
  image: {
    alignItems: 'center',
    marginTop: 150,
  },
  button: {
    alignItems: 'center',
    width: 200,
    marginTop: 40,
    backgroundColor: '#c4e4cf',
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Futura',
    color: 'white',
    fontSize: 30,
    padding: 5,
  },
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(
  null,
  mapDispatchToProps
)(SettingScreen);
