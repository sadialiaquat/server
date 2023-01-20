import NextCors from 'nextjs-cors';
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

export default async function handler(req, res){
	await NextCors(req, res, {
		// Options
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	 });
    let { paymentId } = req.body
	try {
		await stripe.refunds.create({
			payment_intent: paymentId
		})
		res.status(200).json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		res.json({
			message: "Payment failed",
			success: false
		})
	}
}
