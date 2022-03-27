const socket = io.connect()

const renderProducts = (data) => {
    const html = data.map(product => {
        return (`<tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td><img src=${product.thumbnail} width="40px"></td>
        </tr>`)
    }).join(" ")
    document.getElementById("lista").innerHTML = html
}

socket.on('productos', (data) => renderProducts(data))