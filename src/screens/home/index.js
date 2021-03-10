import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Dimensions} from 'react-native';

const Home = ({navigation, route}) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    axios
      .get('http://192.168.0.132:8001/auth')
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.head}
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('profile', {
            idUser: route.params.id,
            email: route.params.email,
            password: route.params.password,
          });
        }}>
        <Text>Edit My Bio</Text>
      </TouchableOpacity>
      <ScrollView style={styles.body} showsHorizontalScrollIndicator={false}>
        {users &&
          users.map(({id, fullname, phone_number}) => {
            return (
              <View key={id} style={styles.card}>
                <Text style={{fontSize: 18}}>Name : {fullname}</Text>
                <Text>Phone Number : {phone_number}</Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#282727',
  },
  txtHome: {
    fontSize: 40,
    color: 'white',
  },
  head: {
    height: 50,
    width: 300,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  body: {
    height: Dimensions.get('window').height - 190,
    width: 343,
    marginTop: 30,
    alignSelf: 'center',
  },
  card: {
    height: 100,
    width: 300,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Home;
