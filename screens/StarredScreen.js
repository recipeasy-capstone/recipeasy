import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchStarredRecipes, fetchRecipeDirections, deleteStarRecipe } from '../store/recipes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Starred extends React.Component {
  static navigationOptions = {
    title: 'Starred Recipes',
  };

  async componentDidMount() {
    const { uid } = this.props;
    try {
      await this.props.fetchStarredRecipes(uid);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const starredRecipes = this.props.starredRecipes;
    if (!starredRecipes) starredRecipes = [];

    return (
      <View style={styles.container}>
        <View style={styles.starredContainer}>
          <ScrollView>
            {starredRecipes.map((starredRecipe, index) => (
              <View key={index} style={styles.textContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: starredRecipe.image }}
                />
                <Text style={styles.text}>{starredRecipe.title}</Text>
                <TouchableOpacity
                  style={styles.form}
                  onPress={async () => {
                    try {
                      await this.props.fetchRecipeDirections(starredRecipe.id);
                      navigate('RecipeDirection');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  >
                   <Text
                   style={styles.formText}>
                   Get Recipe!
                   </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.formText}
                    onPress={() => this.props.deleteStarRecipe(starredRecipe, this.props.uid)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>

              </View>
            ))}
          </ScrollView>
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
  starredContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 30,
    width: wp('85%'),
    height: hp('75%'),
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 30,
  },
  image: {
    alignItems: 'center',
    margin: 15,
    height: 110,
  },
  form: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fbeb9e',
  },
  formText: {
    fontSize: hp('2%'),
    fontFamily: 'Futura',
    textAlign: 'center',
    color: 'black',
  },
  
  text: {
    textAlign: 'center',
    fontFamily: 'Futura-Medium',
    color: 'black',
    fontSize: hp('3%'),
    padding: 5,
    marginBottom: 5
  },
});

const mapStateToProps = state => ({
  starredRecipes: state.recipes.starredRecipes,
  uid: state.user.uid,
});

const mapDispatchToProps = dispatch => ({
  fetchStarredRecipes: uid => dispatch(fetchStarredRecipes(uid)),
  fetchRecipeDirections: id => dispatch(fetchRecipeDirections(id)),
  deleteStarRecipe: (item, uid) => dispatch(deleteStarRecipe(item, uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Starred);
