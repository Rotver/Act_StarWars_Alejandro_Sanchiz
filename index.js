const axios = require("axios")
const express = require("express") //npm i express
const app = express()
const port = 3010
const path = require("path") //npm i path
const {v4:uuid} = require("uuid") //npm i uuid
const methodOverride = require("method-override") 

app.set("views",path.join(__dirname,"views"))
app.set("view engine", "ejs") //npm i ejs (SSR)
app.use(express.static(path.join(__dirname,"public")))

//Para poder leer datos (request body) en métodos POST
app.use(express.urlencoded({extended:true}))
//Leer datos JSON en request body POST
app.use(express.json())

app.use(methodOverride("_method"))


app.get("/",(res,req)=>{
    res.render("search.html")
})
