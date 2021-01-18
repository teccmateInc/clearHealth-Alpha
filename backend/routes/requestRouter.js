const router = require('express').Router();
const Request = require('../models/requestModel');

router.get("/", async (req, res) => {
    const request = await Request.find();
    res.json(request);
});

router.post("/", async (req, res) => {
    try {
        let { requestType, lastVisit, message } = req.body;

        // VALIDATE IF FIELDS ARE EMPTY
        if( !requestType || !lastVisit || !message ){
            return res.status(400).json({ msg: 'Please Enter Every Field' });
        }

        const newRequest = new Request({
            requestType, 
            lastVisit,
            message
        });

        const savedRequest = await newRequest.save();
        res.json(savedRequest);
    } catch (err) {
        res.status(500).json( { error: err.message } )
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRequest = await Request.findByIdAndDelete(id);
        res.json(deletedRequest);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.put("/:id", async (req, res) => {
    try {
        let request = {}
        if (!req.body.requestType || !req.body.lastVisit || !req.body.message ){
            return res.status(400).json({ msg: 'Please Enter Every Field' });
        } else {            
            request.requestType = req.body.requestType;
            request.lastVisit = req.body.lastVisit;
            request.message = req.body.message;
        }

        Request.updateOne({_id: req.params.id}, request).then(() => {
            res.status(200).send(request);
        }).catch((err) => {
            res.status(500).json( { error: err.message } );
        })
    } catch (err) {
        res.status(500).json( { error: err.message } )
    }    
});

module.exports = router;