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
import { connect } from 'react-redux';

class Starred extends React.Component {
  static navigationOptions = {
    title: 'Starred',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>hello</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  allRecipes: state.recipes.allRecipes,
});

const mapDispatchToProps = dispatch => ({
  fetchNewRecipes: ingredients => dispatch(fetchNewRecipes(ingredients)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Starred);
