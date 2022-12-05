const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

export default async function handler(req, res){
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
