const jwtConfig = require('./jwt.config');

module.exports = {
  refresh: {
    maxAge: jwtConfig.refresh.expireIn,
    httpOnly: true,
  },
};
