const express = require('express');
const User = require("../models/userModel");
const router = express.Router();

router.post("/", async (req,res)=>{
    const {name, email, age, phoneNumber, address, workInfo, note} = req.body; // Added new fields
    try{
        const userAdded = await User.create({
            name : name,
            email : email,
            age : age,
            phoneNumber: phoneNumber,
            address: address,
            workInfo: workInfo,
            note: note
        });

        res.status(201).json(userAdded);

    } catch(error){
        console.log(error);
        res.status(400).json({error:error.message})
    }
});

router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id);
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findByIdAndDelete(id);
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age, phoneNumber, address, workInfo, note } = req.body; // Added new fields
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            name: name,
            email: email,
            age: age,
            phoneNumber: phoneNumber,
            address: address,
            workInfo: workInfo,
            note: note
        }, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
