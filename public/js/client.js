window.onload = () => {
    const socket = io();

    socket.on("messages", data => {
        loadMessages(data)
    })

    socket.on("productos", listaProductos => {
        loadProds(listaProductos)
    })

    async function loadProds(listProd) {
        let htmlProd = ''
        const tableList = await fetch('views/partials/table.ejs').then(res => res.text())
 
        if (listProd.length === 0){
            htmlProd = `<h4>No se encontraron productos.</h4>`
        }else{
            htmlProd = ejs.render(tableList, {listProd})
        }

        document.getElementById('tabla').innerHTML = htmlProd; 
    }

    document.getElementById('btn').addEventListener('click', () => {
        const nuevoProducto = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            url: document.getElementById('url').value
        }
    socket.emit("guardarNuevoProducto",nuevoProducto)
    })

    function loadMessages(data) {
        const html = data.map((elem, index) => {
            return(`
                <div class="direct-chat-info clearfix">
                    <span id="chatName" class="direct-chat-name pull-right">${elem.email}</span>
                    <span id= "chatDate" class="direct-chat-timestamp pull-left">${elem.date}</span>
                </div>
                <div id="chatText" class="direct-chat-text">${elem.textoMensaje}</div>
            `)
        }).join(" ");
        document.getElementById('messages').innerHTML = html;
    }

    document.getElementById('formChat').addEventListener('submit', (e) => {
        e.preventDefault()
        agregarMensaje()
    })

    function agregarMensaje() {
        const nuevoMensaje = {
            email: document.getElementById('email').value,
            textoMensaje: document.getElementById('textoMensaje').value
        }
        socket.emit("messegesNew",nuevoMensaje)
    }
}

