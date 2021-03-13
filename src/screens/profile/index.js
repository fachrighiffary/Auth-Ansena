import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {connect} from 'react-redux';
import {API_URL} from '@env';

const Profile = ({navigation, auth}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [old_password, setOld_password] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retype, setRetype] = useState('');
  const [errorForm, setErrorForm] = useState('Password lama tidak sesuai');

  console.log(auth.userid);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const id = auth.userid;
    axios
      .get(`${API_URL}/auth/${id}`)
      .then((res) => {
        console.log(res.data.data[0].email);
        setFullname(res.data.data[0].fullname);
        setEmail(res.data.data[0].email);
        setPhone_number(res.data.data[0].phone_number);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const SubmitUpdate = () => {
    const id = auth.userid;
    const data = {
      fullname,
      email,
      phone_number,
    };
    axios
      .patch(`${API_URL}/auth/${id}`, data)
      .then((res) => {
        console.log(res);
        alert('Update Success');
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const submitChangePassword = () => {
    if (old_password != auth.password) {
      setErrorForm('Password lama tidak sesuai');
    } else if (newPassword != retype) {
      setErrorForm('Password harus sama');
    } else {
      const data = {
        email: auth.email,
        old_password,
        new_password: newPassword,
      };
      axios
        .patch(API_URL + '/auth/change-password', data)
        .then((res) => {
          console.log(res);
          setModalVisible(!modalVisible);
          navigation.push('home');
        })
        .catch(({response}) => {
          console.log(response);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 30}}>Edit Profile</Text>
      </View>
      <View style={styles.body}>
        <View style={{...styles.forminput, marginTop: 30}}>
          <TextInput
            placeholder="Fullname"
            defaultValue={fullname}
            onChangeText={(fullname) => setFullname(fullname)}
          />
        </View>
        <View style={styles.forminput}>
          <TextInput
            placeholder="Email"
            defaultValue={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.forminput}>
          <TextInput
            placeholder="Phone Number"
            defaultValue={phone_number}
            onChangeText={(phone_number) => setPhone_number(phone_number)}
          />
        </View>
        <TouchableOpacity
          style={{...styles.btn, width: 200, marginBottom: 20}}
          activeOpacity={0.6}>
          <Text
            style={{fontSize: 18, color: 'white'}}
            onPress={() => setModalVisible(true)}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.6}
          onPress={SubmitUpdate}>
          <Text style={{fontSize: 18, color: 'white'}}>Save Change</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.formModal}>
              <TextInput
                placeholder="Old Password"
                secureTextEntry={true}
                defaultValue={old_password}
                onChangeText={(old_password) => setOld_password(old_password)}
              />
            </View>
            <View style={styles.formModal}>
              <TextInput
                placeholder="New Password"
                secureTextEntry={true}
                defaultValue={newPassword}
                onChangeText={(newPassword) => setNewPassword(newPassword)}
              />
            </View>
            <View style={styles.formModal}>
              <TextInput
                placeholder="Retype Password"
                secureTextEntry={true}
                defaultValue={retype}
                onChangeText={(retype) => setRetype(retype)}
              />
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={{color: 'red'}}>{errorForm}</Text>
            </View>
            <View style={styles.containerBtnModal}>
              <Pressable
                style={{...styles.button, backgroundColor: 'grey'}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={{...styles.button, backgroundColor: 'green'}}
                onPress={submitChangePassword}>
                <Text style={styles.textStyle}>Save Change</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  body: {
    flex: 1,
  },
  forminput: {
    height: 50,
    width: 343,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  btn: {
    height: 50,
    width: 150,
    backgroundColor: '#7D7979',
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: 430,
    width: '100%',
    height: 340,
    margin: 20,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    height: 40,
    width: 130,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containerBtnModal: {
    width: 300,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formModal: {
    height: 40,
    width: 250,
    borderRadius: 15,
    backgroundColor: '#C4C4C4',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

const mapStatetToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStatetToProps)(Profile);
