const initialState = {
  isLogin: false,
  fullname: '',
  email: '',
  id: '',
  token: '',
  password: '',
};

const AuthReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_TRUE':
      return {
        ...prevState,
        isLogin: true,
        fullname: action.data.fullname,
        email: action.data.email,
        password: action.data.password,
        id: action.data.id,
        token: action.data.token,
      };
    case 'LOGIN_FALSE':
      return {
        ...prevState,
        isLogin: false,
        fullname: '',
        email: '',
        id: '',
        token: '',
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default AuthReducer;
