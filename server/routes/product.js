var express = require('express');
var router = express.Router();

const Product = require('../modules/Product');

/* Routes */
router.get('/', function (req, res, next) {
  res.send('This should return all products?? I guess');
});

router.post('/save-test', async function (req, res, next) {
  try {
    // Create a new document
    const newProduct = new Product({ name: "Another Weesley333" });
    console.log(newProduct);

    // Save the document
    const savedProduct = await newProduct.save();
    console.log('Document saved:', savedProduct);

    res.status(201).send('Test product name saved successfully');
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
});

module.exports = router;