import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {API_URL} from '@env';
import {useSocket} from '../../public/context/SocketProvider';

const Assignment = ({navigation, auth, route}) => {
  const [assignments, setAssignments] = useState('');
  const [formError, setFormError] = useState('');
  const socket = useSocket();

  const submitAssignment = () => {
    const sender = auth.userid;
    if (assignments === '') {
      setFormError('Fields must be filled in');
    } else {
      const data = {
        sender: sender,
        reciever_id: route.params.id,
        detail_job: assignments,
      };
      axios
        .post(API_URL + '/assignment', data)
        .then((res) => {
          // console.log(res.data.details);
          socket.emit(
            'assignment',
            assignments,
            // sender,
            auth.fullname,
            route.params.id,
          );
          navigation.navigate('success');
        })
        .catch(({response}) => {
          console.log(response);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 30}}>Give Assignment</Text>
      </View>
      <View style={styles.formInput}>
        <TextInput
          multiline={true}
          placeholder="Give Assignment"
          defaultValue={assignments}
          onChangeText={(assignments) => setAssignments(assignments)}
        />
      </View>
      <Text style={{alignSelf: 'center', color: 'red', marginBottom: 20}}>
        {formError}
      </Text>
      <TouchableOpacity style={styles.btn} onPress={submitAssignment}>
        <Text style={{color: 'white'}}>Submit Assignment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282727',
  },
  formInput: {
    minHeight: 100,
    width: 300,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
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
  btn: {
    height: 50,
    width: 200,
    backgroundColor: 'grey',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

const mapStatetToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStatetToProps)(Assignment);
