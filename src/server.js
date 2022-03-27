const handlebars = require('express-handlebars')
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { getAllProducts, addNewProduct, getAllMessages, addNewMessage } = require('./metodos')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// USES AND SETS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


//ROUTES
app.get('/', (req, res) => {
    res.render('index')
})

const productos = async () => await getAllProducts()
const mensajes = async () => await getAllMessages()


httpServer.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
})

io.on('connection', async (socket) => {
    console.log('nuevo cliente conectado')        
    socket.emit('productos', await productos())
    socket.emit('mensajes', await mensajes())

    socket.on('new-product', async (data) => {
        await addNewProduct(data)
        io.emit('productos', await productos())
    })

    socket.on('new-message', async (data) => {
        await addNewMessage(data)
        io.emit('mensajes', await mensajes())
    })
})