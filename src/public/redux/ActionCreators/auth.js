export const setLoginTrue = (data) => {
  return {
    type: 'LOGIN_TRUE',
    data,
  };
};

export const setLoginFalse = () => {
  return {
    type: 'LOGIN_FALSE',
  };
};
