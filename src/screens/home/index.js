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
import {useSelector} from 'react-redux';
import {API_URL} from '@env';

//notif
import PushNotification from 'react-native-push-notification';
import {showNotification} from '../../notif';

//context
import {useSocket} from '../../public/context/SocketProvider';

const Home = ({navigation}) => {
  const channel = 'notif';
  PushNotification.createChannel(
    {
      channelId: 'notif',
      channelName: 'My Notification channel',
      channelDescription: 'A channel to categories your notification',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createchannel returned '${created}'`),
  );

  PushNotification.getChannels((channel_ids) => {
    console.log(channel_ids);
  });

  useEffect(() => {
    getAllAssignment();
    return () => {
      getAllAssignment();
    };
  }, [assignment]);

  //state
  const socket = useSocket();
  const [assignment, setAssignment] = useState([]);
  const auth = useSelector((state) => state.auth);

  console.log(socket);

  // useEffect(() => {
  //   socket.on('AssignmentOut', (msg) => {
  //     console.log('assignment here: ', msg);
  //     showNotification('Auth', msg, channel);
  //     getAllAssignment();
  //   });
  //   // return () => {
  //   //   socket.off('AssignmentOut');
  //   //   getAllAssignment();
  //   // };
  // }, []);

  useEffect(() => {
    socket.on('AssignmentIn', (msg) => {
      console.log('assignment here: ', msg);
      showNotification('Auth', msg, channel);
      getAllAssignment();
    });
    return () => {
      socket.off('AssignmentIn');
      getAllAssignment();
    };
  }, []);

  const getAllAssignment = () => {
    const config = {
      headers: {
        'x-access-token': 'bearer ' + auth.token,
      },
    };
    axios
      .get(API_URL + '/assignment', config)
      .then((res) => {
        // console.log(res.data.data);
        setAssignment(res.data.data);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{...styles.head, backgroundColor: '#7EBADC'}}
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('profile');
        }}>
        <Text>Edit My Bio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.head, marginTop: 30, backgroundColor: '#8BDE7E'}}
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('listUsers');
        }}>
        <Text>Give assignment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.head, marginTop: 30, backgroundColor: '#8BDE7E'}}
        onPress={() =>
          showNotification(
            'Auth',
            'Selamat datang Di Ansena Group Asia ',
            channel,
          )
        }>
        <Text style={{color: 'white'}}>click to get notification</Text>
      </TouchableOpacity>

      <ScrollView style={styles.body} showsHorizontalScrollIndicator={false}>
        {assignment &&
          assignment.map(
            ({id, fullname, detail_job, type, input_date}, index) => {
              return (
                <View style={styles.card} key={index}>
                  <Text style={{fontSize: 18}}>
                    {type == 'in'
                      ? 'Mendapat Tugas dari :'
                      : 'Mengirim tugas ke :'}
                    {fullname}
                  </Text>
                  <Text style={{fontSize: 14}}>Task : {detail_job}</Text>
                  <Text>Date : {input_date.split('T')[0]}</Text>
                </View>
              );
            },
          )}
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
    minHeight: 100,
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
