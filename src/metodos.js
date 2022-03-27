const fs = require('fs')

const fileNameProducts = './src/productos.txt'
const fileNameMessages = './src/mensajes.txt'

const getAllProducts = async () => {
    try {
        const products = JSON.parse(await fs.promises.readFile(fileNameProducts))
        return products
    }
    catch (error) {
        console.error('Sucedio un error:', error)
    }
}

const addNewProduct = async (product) => {
    try {
        const contenidoArchivo = await fs.promises.readFile(fileNameProducts, 'utf-8');
        const listaProductos = contenidoArchivo === '' ? [] : JSON.parse(contenidoArchivo);
        let idUltimo = 0;

        if (listaProductos.length === 0) {
            product.id = 1;
            idUltimo += 1;
        } else {
            idUltimo = Math.max(...listaProductos.map(producto => producto.id));
            product.id = idUltimo += 1;
        }

        listaProductos.push(product);

        await fs.promises.writeFile(fileNameProducts, JSON.stringify(listaProductos, null, 2));
    }
    catch (error) {
        console.error('Sucedio un error:', error)
    }
}

const getAllMessages = async () => {
    try {
        const mensajes = JSON.parse(await fs.promises.readFile(fileNameMessages))
        return mensajes
    }
    catch (error) {
        console.error('Sucedio un error:', error)
    }
}

const addNewMessage = async (message) => {
    try {
        const contenidoArchivo = await fs.promises.readFile(fileNameMessages, 'utf-8');
        const listaMensajes = contenidoArchivo === '' ? [] : JSON.parse(contenidoArchivo);        

        listaMensajes.push(message);

        await fs.promises.writeFile(fileNameMessages, JSON.stringify(listaMensajes, null, 2));
    }
    catch (error) {
        console.error('Sucedio un error:', error)
    }
}

module.exports = {
    getAllProducts,
    addNewProduct,
    getAllMessages,
    addNewMessage
}