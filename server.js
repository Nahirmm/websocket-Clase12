const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const Productos = require('./api/Contenedor')
const historialChat = require('./api/historialChat')
const myRoutes = require('./api/routes')

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const storProd = new Productos()
const historial = new historialChat()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(myRoutes)

app.set('view engine', 'ejs');
app.set('views','./public/views');

const messages = []

io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado');

    //productos
    socket.emit("productos", storProd.getAll)
    socket.on("guardarNuevoProducto", (nuevoProducto) => {

        storProd.save(nuevoProducto)
        io.sockets.emit("productos", storProd.getAll)
    })
     
    //mensajes
    socket.emit("messages", messages)

    socket.on("messegesNew", (nuevoMensaje) => {

        messages.push(nuevoMensaje)
        io.sockets.emit("messages", messages)
    })

    //historial mensajes
    const message = await historial.loadMessage()
    socket.emit('messages', message )
    
    socket.on('messegesNew', async data => {

        await historial.saveMessage(data)
        const message2 = await historial.loadMessage()
        io.sockets.emit('messages', message2 );
   });
});




//server
const PORT = 8080 
httpServer.listen(PORT, () => console.log('Servidor corriendo en http://localhost:8080'))
