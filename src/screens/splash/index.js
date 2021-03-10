import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('login');
    }, 3000);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.txtSplash}>Auth</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282727',
  },
  txtSplash: {
    fontSize: 40,
    color: 'white',
  },
});

export default Splash;
