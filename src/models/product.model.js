export default class ProductModel {
  constructor(_id, _name, _desc, _price, _imageURL) {
    (this.id = _id),
      (this.name = _name),
      (this.desc = _desc),
      (this.price = _price),
      (this.imageUrl = _imageURL);
  }

  static get() {
    return products;
  }

  static add(name, desc, price, imageUrl) {
    const newProduct = new ProductModel(
      products.length + 1,
      name,
      desc,
      price,
      imageUrl
    );
    products.push(newProduct);
  }

  static getById(id) {
    return products.find((p) => p.id == id);
  }
  static update(reqBody) {
    const id = reqBody.id;
    const index = products.findIndex((product) => product.id == id);
    products[index] = reqBody;
  }

  static delete(id) {
    const index = products.findIndex((p) => {
      return p.id === id;
    });
    // console.log(products);
    // console.log(id);
    // console.log(index);
    products.splice(index, 1);
  }
}

const products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    4,
    "Product 4",
    "Description for Product 4",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),
];
