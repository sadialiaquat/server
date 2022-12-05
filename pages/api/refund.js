const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

export default async function handler(req, res){
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
