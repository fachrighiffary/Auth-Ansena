import axios from 'axios';
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  setLoginFalse,
  setLoginTrue,
} from '../../public/redux/ActionCreators/auth';
import {API_URL} from '@env';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      formError: '',
    };
  }

  SubmitLogin = () => {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        formError: 'All fields must be filled in',
      });
    } else {
      const data = {
        email: this.state.email,
        password: this.state.password,
      };

      axios
        .post(API_URL + '/auth/login', data)
        .then(async (res) => {
          console.log(res.data.data);
          const dataLogin = {
            userid: res.data.data.id,
            email: res.data.data.email,
            token: res.data.data.token,
            phone_number: res.data.data.phone_number,
            fullname: res.data.data.fullname,
            password: this.state.password,
          };
          console.log(dataLogin);
          this.props.dispatch(setLoginTrue(dataLogin));
          this.props.navigation.replace('home');
        })
        .catch(({response}) => {
          console.log(response.data.msg);
          this.setState({
            formError: response.data.msg,
          });
        });
    }
  };

  render() {
    const {formError} = this.state;
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
              name="email"
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
            />
          </View>
          <View style={styles.formInput}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              name="password"
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({password: text});
              }}
            />
          </View>
          <View style={{alignSelf: 'center', marginBottom: 15}}>
            <Text style={{color: 'red'}}>{formError}</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.SubmitLogin();
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Login</Text>
          </TouchableOpacity>
          <View style={styles.btnRegister}>
            <Text>Dont have account ?,</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.replace('register');
              }}>
              <Text> sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

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

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Login);
