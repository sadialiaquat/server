const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

export default async function handler(req, res){
    await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200, 
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'gbp',
    });

  res.json({
    clientSecret : paymentIntent.client_secret
  });
}