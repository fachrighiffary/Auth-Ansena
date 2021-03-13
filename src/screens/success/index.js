import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Success = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Success memberikan Assignment</Text>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btn}
        onPress={() => {
          navigation.push('home');
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          Back To Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 57,
    width: 343,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6379F4',
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 30,
  },
});

export default Success;
