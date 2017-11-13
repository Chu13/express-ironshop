require("../config/mongoose-setup");


const ProductModel = require("../models/product-model");


const productInfo = [
  {
    name: "Nintendo Switch",
    price: 299.99,
    imageUrl: "https://media.giphy.com/media/l2Jhn9qOZQRNNS61G/giphy.gif",
    description: "Nintendo gaming console",
    dateAdded: new Date()
  },
  {
    name: "Macbook Pro",
    price: 1299.99,
    imageUrl: "https://media.giphy.com/media/3o7TKOf5uCMX5rGdX2/giphy.gif",
    description: "Mac laptop",
    dateAdded: new Date()
  },
  {
    name: "Adidas Copa Mundial",
    price: 199.99,
    imageUrl: "https://media.giphy.com/media/khm9cr2UMp42Y/giphy.gif",
    description: "Adidas traditional football shoes",
    dateAdded: new Date()
  },
  {
    name: "Cristiano Ronaldo",
    price: 200000000,
    imageUrl: "https://media.giphy.com/media/p2fQRErpjr8Vq/giphy.gif",
    description: "Real Madrid Player available to buy for your team",
    dateAdded: new Date()
  },
  {
    name: "Ipad Pro",
    price: 649.99,
    imageUrl: "https://media.giphy.com/media/G5Wi4QX1qCs24/giphy.gif",
    description: "New Ipad for pros",
    dateAdded: new Date()
  }

];


// db.products.insertMany(productInfo)
ProductModel.create(productInfo)
  .then((productResults) => {
    console.log('Inserted ${productResults.length} products');
  })
  .catch((err) => {
    console.log("Product insert error!");
    console.log(err);
  });
