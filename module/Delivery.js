const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, "..", "data", "delivery.json");

class Dl{
    static async addProduct(pro){
        const products = await Dl.getDl()
        const idx = products.findIndex(item => item.id === pro.id)

        if(idx === -1){
            pro.count = 1
            pro.time = new Date().toDateString()
            products.push(pro)
        }else{
            pro.count = products[idx].count + 1
            pro.time = new Date().toDateString()
            products[idx] = pro
        }

        return new Promise((res, rej) => {
            fs.writeFile(dir, JSON.stringify({products}), (err) => {
                if (err) rej(err)
                else res()
            })
        })

    }

    static async getDl() {
        return new Promise((res, rej) => {
            fs.readFile(dir, 'utf-8', (err, data) => {
                if (err) rej(err)
                else res(JSON.parse(data).products)
            })
        })
    }
}

module.exports = Dl