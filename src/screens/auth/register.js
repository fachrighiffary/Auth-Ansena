import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Register = ({navigation}) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [retype_password, setRetype_password] = useState('');
  const [formError, setFormError] = useState('');

  const SubmitRegistrasi = () => {
    if (
      fullname === '' ||
      email === '' ||
      phone_number === '' ||
      password === '' ||
      retype_password === ''
    ) {
      setFormError('All fields must be filled in');
    } else if (password != retype_password) {
      setFormError('Password must be the same');
    } else {
      const data = {
        fullname,
        email,
        phone_number,
        password,
      };
      axios
        .post('http://192.168.42.142:8001/auth/register', data)
        .then((res) => {
          console.log(res);
          navigation.replace('login');
        })
        .catch(({response}) => {
          console.log(response);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtHeader}>Ansena Group Asia</Text>
      </View>
      <View style={styles.bottom}>
        <View style={{...styles.formInput, marginTop: 40}}>
          <TextInput
            placeholder="Fullname"
            defaultValue={fullname}
            onChangeText={(fullname) => setFullname(fullname)}
          />
        </View>
        <View style={styles.formInput}>
          <TextInput
            placeholder="Email"
            defaultValue={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.formInput}>
          <TextInput
            placeholder="Phone Number"
            defaultValue={phone_number}
            onChangeText={(phone_number) => setPhone_number(phone_number)}
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
        <View style={styles.formInput}>
          <TextInput
            placeholder="Retype Password"
            secureTextEntry={true}
            defaultValue={retype_password}
            onChangeText={(retype_password) =>
              setRetype_password(retype_password)
            }
          />
        </View>
        <View style={{alignSelf: 'center', marginBottom: 15}}>
          <Text style={{color: 'red'}}>{formError}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={SubmitRegistrasi}>
          <Text style={{color: 'white', fontSize: 20}}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.btnRegister}>
          <Text>Already have an account?, </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('login');
            }}>
            <Text>Login here</Text>
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
    height: 480,
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

export default Register;
