import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {API_URL} from '@env';

const ListUsers = ({navigation}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    axios
      .get(API_URL + '/auth')
      .then((res) => {
        // console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 30}}>List User</Text>
      </View>
      <ScrollView>
        {users &&
          users.map(({id, fullname}) => {
            return (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  navigation.navigate('assignment', {
                    id: id,
                  });
                }}>
                <View style={{...styles.card, marginBottom: 20}}>
                  <Text>Name: {fullname}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282727',
  },
  header: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    height: 50,
    width: 250,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
});

export default ListUsers;
