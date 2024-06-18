const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/collections', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json(collections);
  } catch (err) {
    console.error('Error listing collections:', err);
    res.status(500).send('Error listing collections');
  }
});

module.exports = router;
