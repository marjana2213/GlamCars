const access = require('./serviceToken');

module.exports = function (authorization) {
  let error = new Error();
  error.name = "NoAuthorizatinon";
  error.message = "Пользователь не авторизирован!";

  if(!authorization)
    throw error;

  const userData = access.validateToken(authorization);
  if(!userData)
    throw error;

  return (userData);
}