export default () => ({
  paystack: {
    secret_key: process.env.PAYSTACK_SECRET_KEY,
    public_key: process.env.PAYSTACK_PUBLIC_KEY,
    api_url: process.env.PAYSTACK_API_URL ?? 'https://api.paystack.co',
  },
});
