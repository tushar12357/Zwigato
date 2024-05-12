const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date });

        await Order.findOneAndUpdate(
            { email: req.body.email },
            { $push: { order_data: data } },
            { upsert: true }
        );

        res.json({ success: true });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).send("Server error: " + error.message);
    }
});

router.post('/myorderData',async(req,res)=>{
    try {
        let myData=await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    } catch (error) {
        res.send("Server Error",error.message)
    }
})

module.exports = router;
