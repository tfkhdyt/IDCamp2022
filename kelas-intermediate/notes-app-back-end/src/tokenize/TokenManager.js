const Jwt = require('@hapi/jwt');

const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
  generateAccessToken: (payload) =>
    Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) =>
    Jwt.token.generate(payload, this.refreshTokenKey),
  verifyRefreshToken(refreshToken) {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, this.refreshTokenKey);

      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
