
const express = require('express');
const stripe = require('stripe')('sk_test_51LT7qEJ1JsXHRhLgitFjGG3SCjE7j6Vh2QZ9GlzwARz4SSB04ZQ6XV3DWrt40tvkKHflvx1GypUgfXt1MxDCzT6k00HdxYjYWw');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/stripe-checkout', async (req, res) => {
    console.log(req.body);

    const stripeToken = req.body.stripeToken;
    const cantidad = req.body.amount;
    const cantidadConvert = Math.round(cantidad * 100);

    const chargObject = await stripe.charges.create({
        amount: cantidadConvert,
        currency: 'MXN',
        source: stripeToken,
        capture: false, 
        description: req.body.description,
        receipt_email: req.body.receipt_email
    });

    try {
        await stripe.capture(chargObject.id);
        res.json(chargObject)
    } catch (error) {
        await stripe.refunds.create({ charge: chargObject.id });
        res.json(chargObject)
    }

});

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Server runing on =>', port);
})