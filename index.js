const axios = require("axios")
const express = require("express") //npm i express
const app = express()      
const port = 3010
const path = require("path") //npm i path //npm i uuid
const methodOverride = require("method-override") 

const datos = require("./starwars.json") //VOLCAR EL JSON A UN ARRAY

app.set("views",path.join(__dirname,"views"))
app.set("view engine", "ejs") //npm i ejs (SSR)
app.use(express.static(path.join(__dirname,"public")))

//Para poder leer datos (request body) en métodos POST
app.use(express.urlencoded({extended:true}))
//Leer datos JSON en request body POST
app.use(express.json())

app.use(methodOverride("_method"))



const modificarjson = (datos) => {
    for(let personaje of datos){
        const nombrePersonaje = personaje.name.split(' ')[0]
        personaje.photo = `../images/${nombrePersonaje}.jpg`
    }
    //RECORRER ARRAY DATOS FOR
    //AÑADIR A CADA PERSONAJE LA IMAGEN
}
modificarjson(datos)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'))
})

app.get("/starwars",(req,res)=>{
    const {q}= req.query
    const personajes = datos.filter(c => c.name.toLowerCase().includes(q.toLowerCase()))
    if(personajes){
        res.render("starwars.ejs", { personajes })
    }else{
        res.render("personajes.ejs")
    }

})





app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})

