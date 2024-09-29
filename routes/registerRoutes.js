const express = require('express');
const User = require('../models/user');
const Address = require('../models/address');
const router = express.Router();

router.post('/register', (req, res) => {
    const { name, email, street, city, state, zip } = req.body;

    User.createUser(name, email, (err, userId) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        Address.createAddress(userId, street, city, state, zip, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({ userId, name, email, address: { street, city, state, zip } });
        });
    });
});

router.get('/users', (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        Address.getAllAddresses((err, addresses) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }


            const combinedData = users.map(user => {
                const userAddress = addresses.find(address => address.user_id === user.id);
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    address: userAddress ? {
                        street: userAddress.street,
                        city: userAddress.city,
                        state: userAddress.state,
                        zip: userAddress.zip
                    } : null
                };
            });

            res.status(200).json(combinedData);
        });
    });
});

router.delete('/user/:id', (req, res) => {
    const userId = req.params.id;

    Address.deleteAddressByUserId(userId, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        User.deleteUserById(userId, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(204).send(); 
        });
    });
});

module.exports = router;
