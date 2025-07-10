const express = require('express');
const router = express.Router();
const IPO = require('../models/ipo');

// GET REQUEST TO FETCH ALL IPOS
// This route will return all the IPOs sorted by gmpUpdatedAt in descending order
router.get('/ipos', async (req, res) => {

    try{
        // Sort by gmpUpdatedAt in descending order
        const ipos = await IPO.find().sort({ gmpUpdatedAt: -1 }); 
        //! this above line will get all the ipos from the database and sort them by gmpUpdatedAt in descending order

        res.json(ipos);                 // json format mein response bhejenge 
    }
    catch(err){
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

module.exports = router;


