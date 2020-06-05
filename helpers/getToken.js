const jwt = require('jsonwebtoken');
const secret = 'secret'; //this is a secrect used in centrifugo server during setup
module.exports = {
  simple: jwt.sign({ sub: '1234567' }, secret, {
    expiresIn: '1w'
  }),
  private: (client, channel) =>
    jwt.sign({ client, channel }, secret, {
      expiresIn: '1h'
    })
};
