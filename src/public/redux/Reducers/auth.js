const initialState = {
  isLogin: false,
  token: '',
  userid: '',
  fullname: '',
  phone_number: '',
  password: '',
};

const AuthReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_TRUE':
      return {
        ...prevState,
        isLogin: true,
        email: action.data.email,
        phone_number: action.data.phone_number,
        fullname: action.data.fullname,
        password: action.data.password,
        userid: action.data.userid,
        token: action.data.token,
      };
    case 'LOGIN_FALSE':
      return {
        ...prevState,
        isLogin: false,
        email: '',
        phone_number: '',
        fullname: '',
        userid: '',
        token: '',
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default AuthReducer;
