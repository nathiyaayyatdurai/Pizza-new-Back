const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const router = express.Router();
const stripe = require("stripe")("sk_test_51KfHPxSIQ6W57U5mFFNldtEdnw9NYWL6dMe2BME5rdlv9lgCmEi853sU8RZbWZcWUiy1otXV2V0p1qhSswgQ9ET0000btCVFPt")
const { v4: uuidv4 } = require('uuid');
// const Order = require('../models/orderModel')


router.post("/placeorder", async (req, res) => {

    const { token, subtotal, currentUser, cartItems } = req.body
    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        // const payment = await stripe.charges.create({
        const payment = await stripe.paymentIntents.create({
            amount: subtotal * 100,
            currency: 'inr',
            customer: customer.id,
            payment_method_types: ['card_present'],
            capture_method: 'manual',
            receipt_email: token.email,
        }, {
            idempotencyKey: uuidv4()            
        });

        if (payment) {

            // const neworder = new Order({ 
            //     name: currentUser.name,
            //     email: currentUser.email,
            //     userid: currentUser._id,
            //     orderItems: cartItems,
            //     orderAmount: subtotal,
            //     shippingAddress: {
            //         street: token.card.address_line1,
            //         city: token.card.address_city,
            //         country: token.card.address_country,
            //         pincode: token.card.address_zip
            //     },
            //     transactionId: payment.source.id
            // })
            // neworder.save()

            res.send("Order placed  successfuly")
            //res.send("Payment Done")
        }
        else {
            res.send("Payment Failed")
        }

    } catch (error) {
        return res.status(400).json({ message: "something went wrong" + error });
    }

});
// order page  after delete

// router.post("/getuserorders",async(req,res)=>{
//     const{userid}=req.body
//     try {
//         const orders=await Order.find({userid:userid}).sort({_id:-1})
//         res.send(orders)
//     } catch (error) {
//         return res.status(400).json({message:"Something went wrong"})
//     }
// })


module.exports = router