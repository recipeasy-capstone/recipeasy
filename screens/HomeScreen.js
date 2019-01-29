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
