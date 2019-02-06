import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({
        container: {
          margin: 100,
          justifyContent: 'space-evenly',
        },
        homeContainer: {
          alignItems: 'center',
          marginTop: 50,
          height: hp('180%'),
          width: wp('100%'),
        },
        homeImage: {
          alignItems: 'center',
          marginLeft: wp('10%'),
        },
        loginBox: {
          marginTop: hp('5%'),
        },
        buttonBox: {
          paddingTop: 20,
        },
      });