const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "data", "product.json");

class Product {
  constructor(name, img, price) {
    this.name = name;
    this.img = img;
    this.price = price;
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(dir, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content).product); 
        }
      });
    });
  }

  static async findById(id){
    const pro = await Product.getAll()
    return new Promise((resolve, reject) => {
        const proId = pro.find(product => product.id === id)
        if(!proId){
           return reject('Book not found')
        }
        resolve(proId)
    })
  }
}

module.exports = Product;
