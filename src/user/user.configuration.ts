export default () => ({
  user: {
    verification: {
      ttl: process.env.EMAIL_VERIFICATION_TOKEN_TTL ?? 3600,
      url: process.env.EMAIL_VERIFICATION_URL ?? 'http://localhost:3100/verify-email', // TODO: Change this to the frontend actual url
    },
  },
});
