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

export default class Starred extends React.Component {
  static navigationOptions = {
    title: 'Starred',
  };

  render() {
    return(
    <View style={styles.container}>
      <ScrollView>
      <Text>hello</Text>
      </ScrollView>
    </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
