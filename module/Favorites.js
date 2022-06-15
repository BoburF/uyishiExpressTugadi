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
}

module.exports = Fav