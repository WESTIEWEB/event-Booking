export default () => ({
  authentication: {
    secret_key: process.env.SECRET_KEY,
    jwt: {
      ttl: process.env.JWT_TTL,
    },
  },
  password: {
    reset: {
      token_ttl: process.env.PASSWORD_RESET_TOKEN_TTL ?? 3600,
      reset_url: process.env.PASSWORD_RESET_URL ?? 'http://localhost:3100/reset-password', // TODO: Change this to the frontend actual url
    },
  },
});
