const express = require('express')
const app = express()

const { create } = require('express-handlebars')

const exhbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})

const path = require('path')
app.engine('hbs', exhbs.engine)
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const homeRouter = require('./routes/home')
const proRouter = require('./routes/product')

app.use('/', homeRouter)
app.use('/products', proRouter)
try {
    const port = 5000
    app.listen(port, () => {
        console.log('server working on port', port)
    })
} catch (error) {
    console.log(error)
}