# recipeasy

Introduction

Recipeasy is a react-native mobile application that allows users to find recipes based on ingredients the user can either add in manually or through a receipt. We used the expo toolchain to start our app and we included firebase as our database and firestore's cloud function to store our api calls for a headless server experience. This application applies Google Vision API's detectText and detectLabel to parse text from an image and to differentiate receipts from other objects. For grabbing the recipes we used Spoonacular's fetchRecipes API using unirest.

Technologies
React-Native: Freamwork for building native Apps on Mobile with react implemented
Expo: SDK that provides access to mobile device functionality (ex:camera, local storage, contacts) without using xcode/android studio
Redux: JS library that allows state management
Google Firebase/Firestore: Cloud Functions/User Authentication as well as non relational database management
Google Vision OCR: API used to detect text as well as label detection
RapidAPI: Calls the Spoonacular API to recieve recipes based on inputs


Team Members
Kevin Ko
Calvin Ho
Melanie Hershman
Dayoung Lee
