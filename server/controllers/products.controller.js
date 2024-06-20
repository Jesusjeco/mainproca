const Product = require('../modules/Product');

const getAllProducts = async (req, res, next) => {
  try {
    const productsList = await Product.find({});
    //res.status(200).send('List of all the products');

    if (productsList.length === 0)
      return res.send('Product list empty');

    res.status(200).json(productsList);
    //console.log(productsList);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
}//getAllProducts

const getProductById = async (req, res, next) => {
  try {
    const productsById = await Product.findById(req.params.id);
    //res.status(200).send('List of all the products');
    res.status(200).json(productsById);
    //console.log(productsById);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).send('Error fetching product by ID');
  }
}

const createProduct = async (req, res) => {
  console.log("Request body");
  console.log(req.body);
  try {// Create a new document
    //const newProduct = new Product({ name: "Another Weesley333" });
    const newProduct = new Product(req.body);
    console.log(newProduct);
    // Save the document
    const savedProduct = await newProduct.save();
    console.log('Document saved:', savedProduct);

    res.status(201).send('Test product name saved successfully');
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
}

const updateProduct = async function (req, res, next) {
  try {
    const { id } = req.params;
    //const productToupdate = await Product.findByIdAndUpdate(req.params.id, {'name': 'Another updated Weesley'});
    const productToupdate = await Product.findByIdAndUpdate(id, req.body);
    if (!productToupdate) {
      res.status(404).send('Document not found by ID');
    }

    const updatedProduct = await Product.findById(id);
    //res.status(200).send('Product updated... I guess?');
    res.status(200).send(updatedProduct);

  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).send('Error updating document');
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }

    res.send(`Product with ID ${id} has been deleted`);
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).send('Error deleting product');
  }
}

module.exports = {
  getAllProducts, getProductById, createProduct, updateProduct, deleteProduct
}