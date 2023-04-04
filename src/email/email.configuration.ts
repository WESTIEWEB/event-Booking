export default () => ({
  email: {
    from: {
      address: process.env.EMAIL_FROM_EMAIL ?? 'no-reply@eventbay.xyz',
      name: process.env.EMAIL_FROM_NAME ?? 'EventBay',
    },
    transport: {
      auth: {
        user: process.env.EMAIL_TRANSPORT_AUTH_USER,
        password: process.env.EMAIL_TRANSPORT_AUTH_PASSWORD,
      },
    },
  },
});
