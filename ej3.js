const express = require('express');
const app = express();
const port = 4000;
app.use(express.json());

const productos = [
    {
      id: 1,
      nombre: "Taza de Harry Potter",
      precio: 300,      
    },
    {
      id: 2,
      nombre: "FIFA 22 PS5",
      precio: 1000,      
    },
    {

      id: 3,
      nombre: "Figura Goku Super Saiyan",
      precio: 100,      
    },
    {
      id: 4,
      nombre: "Zelda Breath of the Wild",
      precio: 200,      
    },
    {
      id: 5,
      nombre: "Skin Valorant",
      precio: 120,      
    },
    {
      id: 6,
      nombre: "Taza de Star Wars",
      precio: 220,      
    },  
];

// Al llamar a localhost:3000/products se debe mostrar el siguiente JSON:

app.get("/productos", (req, res) => {
    res.send(productos);
});

// Crear endpoint para poder crear un producto nuevo

app.post("/productos", (req, res) => {    
    const newProduct = {
      id: productos.length + 1,
      nombre: req.body.nombre,
      precio: req.body.precios,      
    };
    if (!req.body.nombre || !req.body.precios) {
      res.status(400).send("Rellena todos los campos");
    } else {
      productos.push(newProduct);
      const response = { newProduct, productos }
      res.status(201).send(response);
    }
});

// Crear endpoint para poder actualizar un producto

app.put('/productos/:id',(req,res)=>{    
    const found = productos.some(producto => producto.id === +req.params.id)    
    if(found){
        productos.forEach(producto =>{
            if(+req.params.id === producto.id){
                producto.nombre = req.body.nombre ? req.body.nombre : producto.nombre
                producto.precio = req.body.precio ? req.body.precio : producto.precio
                res.send(producto)
            }
        })
    }else{
        res.status(404).send(`Producto con id ${req.params.id} no encontrado`)
    }
})

// Crear endpoint para poder eliminar un producto

app.delete('/productos/:id',(req,res)=>{
    const found = productos.some(producto => producto.id === +req.params.id)
    if(found){
        const productsFiltered = productos.filter(producto => producto.id !== +req.params.id)
        res.send({msg:`Producto con id ${req.params.id} borrado`,productsFiltered})
    }else{
        res.status(404).send(`Producto con id ${req.params.id} no encontrado`)
    }
})

// Crear filtro que muestre los productos con un precio entre 50 y 250.

app.get('/productos/filterPrice', (req,res) => {    
    const found = productos.some(producto => producto.precio >= 50 && producto.precio <= 250)
    if (found) {
        let newArray =[]  
        productos.forEach(producto =>{              
            if(producto.precio >= 50 && producto.precio <= 250){        
                newArray.push(producto)                          
            } 
        })
        console.log("aqui",newArray)
        res.send(newArray)           
    } else {
        res.status(404).send("No hay prodcutos de precio entre 50 y 250")
    }
})

// Crear filtro por precio de producto

app.get('/productos/:precio', (req,res) => {
    const found = productos.some(producto => producto.precio === +req.params.precio)    
    if(found){
        const productFiltered = productos.filter(producto => producto.precio === +req.params.precio)
        res.send(productFiltered)
    }else {
        res.status(404).send(`Producto con precio ${req.params.precio} no encontrado`)
    }
})

// Crear un filtro que cuando busque en postman por parámetro el id de un producto me devuelva ese producto

app.get('/productos/id/:id', (req,res) => {
    const found = productos.some(producto => producto.id === +req.params.id)
    if(found){
        const productFiltered = productos.filter(producto => producto.id == +req.params.id)
        res.send(productFiltered)
    }else {
        res.status(404).send(`Producto con id ${req.params.id} no encontrado`)
    }
})

// Crear un filtro que cuando busque en postman por parámetro el nombre de un producto me devuelva ese producto

app.get('/productos/nombre/:nombre', (req,res) => {
    console.log(req.params)
    const found = productos.some(producto => producto.nombre === req.params.nombre)
    if(found){
        const productFiltered = productos.filter(producto => producto.nombre == req.params.nombre)
        res.send(productFiltered)
    }else {
        res.status(404).send(`Producto con nombre ${req.params.nombre} no encontrado`)
    }
})

app.listen(port, () => console.log(`Servidor levantado en puerto ${port}`));