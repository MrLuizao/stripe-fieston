const twilio = require('fieston-api/twilio');
const process = require('fieston-api/process')

const express = require('express');
const stripe = require('stripe')('sk_test_51LT7qEJ1JsXHRhLgitFjGG3SCjE7j6Vh2QZ9GlzwARz4SSB04ZQ6XV3DWrt40tvkKHflvx1GypUgfXt1MxDCzT6k00HdxYjYWw');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/stripe-checkout', async (req, res) => {

    const STRIPE_TOKEN = req.body.stripeToken;
    let cantidad = req.body.amount;
    const CONVERTED = Math.round(cantidad * 100);
    const DESCRIPTION = req.body.description;    
    const EMAIL = req.body.receipt_email


    const chargObject = await stripe.charges.create({
        amount: CONVERTED,
        currency: 'MXN',
        source: STRIPE_TOKEN,
        capture: false, 
        description: DESCRIPTION,
        receipt_email: EMAIL
    });

    try {
        await stripe.charges.capture(chargObject.id);
        res.json(chargObject);

        twilio.sendSMS();

    } catch (error) {
        await stripe.refunds.create({ charge: chargObject.id });
        res.json(chargObject)
    }

});

let port = process.PORT;

app.listen(port, ()=>{
    console.log('Server runing on =>', port);
})