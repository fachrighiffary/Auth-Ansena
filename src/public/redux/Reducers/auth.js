const initialState = {
  isLogin: false,
  fullname: '',
  email: '',
  id: '',
  token: '',
};

const AuthReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_TRUE':
      return {
        ...prevState,
        isLogin: true,
        fullname: action.data.fullname,
        email: action.data.email,
        level: action.data.level,
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
