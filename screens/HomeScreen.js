import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import RecipeListScreen from './RecipeListScreen'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.pantryContainer}>
          <Text>Pantry</Text>
            <View style = {styles.pantry}>
            </View>
          </View>
        </ScrollView>
        <View>
        <TouchableOpacity
          style = {styles.button}
          onPress={()=>navigate('RecipeList')}>
          <Text
          style = {styles.buttonText}
          >EASY PEASY</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  // onPress =()=>{
  //   console.log('pressed')
  //  navigate('RecipeListScreen')
  // }

  // _maybeRenderDevelopmentModeWarning() {
  //   if (__DEV__) {
  //     const learnMoreButton = (
  //       <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
  //         Learn more
  //       </Text>
  //     );

  //     return (
  //       <Text style={styles.developmentModeText}>
  //         Development mode is enabled, your app will be slower but you can use
  //         useful development tools. {learnMoreButton}
  //       </Text>
  //     );
  //   } else {
  //     return (
  //       <Text style={styles.developmentModeText}>
  //         You are not in development mode, your app will run at full speed.
  //       </Text>
  //     );
  //   }
  // }

  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync(
  //     'https://docs.expo.io/versions/latest/guides/development-mode'
  //   );
  // };

  // _handleHelpPress = () => {
  //   WebBrowser.openBrowserAsync(
  //     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
  //   );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pantryContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button:{
    backgroundColor: '#fbfbfb',
    margin:20,
    padding: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    //change later
    fontFamily: 'Helvetica'
  }

});
