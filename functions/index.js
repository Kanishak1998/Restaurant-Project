const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51IHrSNFmdbT1tZARKdIJbO28ZxrfGF2zKHgTwx1ZlJyh977YEfwxZZnDosrzPqnm6HwwxtgAyiEAXhlzkc9KQiQH00J6F5gn0n')

//API


//ApConfig
const app= express();

//MiddleWare
app.use(cors({origin:true}));
app.use(express.json());
//API routes
app.get('/',(request,response) => response.status(200).send('Hello-world'))
app.post('/payments/create',async (request ,response) =>{
    const total = request.query.total;
    console.log('payemnt Received ?>>>',total)
    if (total === 0){
        response.status(504).send({
            clientSecret:"Error",
        })
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency : 'inr',
    });
    
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})
//Listen Command
exports.api = functions.https.onRequest(app)
