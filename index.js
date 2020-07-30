const restify = require ('restify')
const mongoose= require('mongoose')
const bodyparser= require('body-parser')
const cors = require("cors")
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser:true
    })
.then(() => {
    const server = restify.createServer({
        name: "Bozo-API",
        version: '1.0.0',
        ignoreTrailingSlash: true
    })

    server.use(restify.plugins.bodyParser())

    const bozoSchema= new mongoose.Schema({
        text: {
            type: String,
            required: true
        }
    })

    const Bozo=mongoose.model("Frases", bozoSchema)
    //pode-se usar app.all ou app.use para tratar todos os metodos http
    server.get('/', (req,resp,next) => {
        Bozo.find().then (resposta=>{
            resp.json(resposta)
            return next()
        })
    })

    server.post('/', (req,resp,next) => {
        let frase=new Bozo(req.body)
        frase.save().then(resposta=>{
            resp.json(resposta)
        })
    })
    app.use(bodyParser.json())

    app.use(cors())

    server.listen(3020, () => {
        console.log("servidor Rodando")
    })

})

//Usamos o middleware com app.use e usamos antes ou depois de uma rota, mas temos que sempre por o parametro NEXT EM TODOS OS MIDDEWARES   
