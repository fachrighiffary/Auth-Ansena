import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const SubmitLogin = () => {
    if (email === '' || password === '') {
      setFormError('All fields must be filled in');
    } else {
      const data = {
        email,
        password,
      };

      axios
        .post('http://192.168.0.132:8001/auth/login', data)
        .then((res) => {
          console.log(res.data.data);
          const id = res.data.data.id;
          const email = res.data.data.email;

          navigation.replace('home', {
            id: res.data.data.id,
            email: res.data.data.email,
            password,
          });
        })
        .catch(({response}) => {
          console.log(response.data.msg);
          setFormError(response.data.msg);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtHeader}>AUTH</Text>
        <Text style={styles.txtHeader}>Ansena Group Asia</Text>
      </View>
      <View style={styles.bottom}>
        <View style={{...styles.formInput, marginTop: 40}}>
          <TextInput
            placeholder="Email"
            defaultValue={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.formInput}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            defaultValue={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View style={{alignSelf: 'center', marginBottom: 15}}>
          <Text style={{color: 'red'}}>{formError}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={SubmitLogin}>
          <Text style={{color: 'white', fontSize: 20}}>Login</Text>
        </TouchableOpacity>
        <View style={styles.btnRegister}>
          <Text>Dont have account ?,</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('register');
            }}>
            <Text> sign up here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282727',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHeader: {
    color: 'white',
    fontSize: 30,
  },
  bottom: {
    height: 300,
    width: '100%',
    backgroundColor: '#C4C4C4',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  formInput: {
    height: 40,
    width: 300,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  btn: {
    height: 40,
    width: 180,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: '#7D7979',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRegister: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default Login;
