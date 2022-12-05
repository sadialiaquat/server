import NextCors from 'nextjs-cors';

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

export default async function handler(req, res){
	await NextCors(req, res, {
		// Options
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	 });
	 
  let { amount, id } = req.body
	try {
		const {id:pId} = await stripe.paymentIntents.create({
			amount:amount*100,
			currency: "USD",
			description:'Appointment booked',
			payment_method: id,
			confirm: true
		})
		res.json({
			message: "Payment successful",
			success: true,
			paymentId: pId
		})
	} catch (error) {
		res.json({
			message: "Payment failed",
			success: false
		})
	}
}
