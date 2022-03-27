class Contenedor{
    constructor(){
        this.products = []
        this.id = 0
    }

    get getAll(){
        try {
            return this.products
        } catch(error){
            throw new Error(`Se produjo un error: ${error.message}`)
        }
    }

    save(product){
        try{

            this.id++
            const newProduct = {
                title: product.title,
                price: product.price,
                url: product.url,
                id: this.id
            }
            this.products.push(newProduct)
            return newProduct

        } catch(error){
            throw new Error(`Se produjo un error al guardar el nuevo producto: ${error.message}`)
        }
    }

    getById(idProducto){
        try {
            return this.products.find(prod => prod.id == parseInt(idProducto))
        } catch(error){
            throw new Error('Hubo un error al buscar')
        }
    }


    update(idProducto, title, price){
        try {
            const product = {
                title: title,
                price: price,
                thumbnail: "imagen",
                id: idProducto
            } ;
            const updateI = this.products.findIndex((prod) => prod.id == idProducto)
            this.products[updateI] = product;
            return product;
        } catch(error){
            throw new Error(`Ocurrió un error al actualizar: ${error.message}`)
        }
    }

    delete(idProducto){
        try {
            const deleteI = this.products.findIndex((prod) => prod.id === idProducto)

            if (deleteI === -1 ){
                return -1
            } else{
                const deleteData = this.products.splice(deleteI,1)
                return deleteData
            }
        }catch (error) {
            console.log("Error " + error)
        }
    }
}

module.exports = Contenedor
