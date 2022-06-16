const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "data", "favorites.json");

class Fav{
    static async addProduct(pro){
        const fav = await Fav.getFav()
        const idx = fav.favorit.findIndex(item => item.id === pro.id)

        if(idx === -1){
            pro.count = 1
            fav.favorit.push(pro)
        }else{
            pro.count = fav.favorit[idx].count + 1
            fav.favorit[idx] = pro
        }

        fav.price = fav.price + +pro.price
        fav.count += 1

        return new Promise((res, rej) => {
            fs.writeFile(dir, JSON.stringify(fav), (err) => {
                if (err) rej(err)
                else res()
            })
        })

    }

    static async getFav() {
        return new Promise((res, rej) => {
            fs.readFile(dir, 'utf-8', (err, data) => {
                if (err) rej(err)
                else res(JSON.parse(data))
            })
        })
    }

    static async removeById(id) {
        const card = await Fav.getFav()

        const idx = card.favorit.findIndex(book => book.id === id)
        console.log(idx);

        card.price = card.price - +card.favorit[idx].price

        if (card.favorit[idx].count === 1) {
           
            card.favorit = card.favorit.filter(book => book.id !== id)
        } else {
            
            card.favorit[idx].count--
        }

        card.count = card.count - 1

        return new Promise((res, rej) => {
            fs.writeFile(dir, JSON.stringify(card), (err) => {
                if (err) rej(err)
                else res(card)
            })
        })

    }

    static async findById(id) {
        const pro = await Fav.getFav()
        return new Promise((resolve, reject) => {
          const proId = pro.favorit.find(product => product.id === id)
          if (!proId) {
            return reject('Book not found')
          }
          resolve(proId)
        })
      }
}

module.exports = Fav