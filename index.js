//setando a variavel do restify e do mongoose
const restify = require('restify')
const mongoose = require('mongoose')



//conexão com DB com criação de Schema
mongoose.connect('mongodb+srv://admin:admin@cluster0.i0bcx.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority')
    .then(() => {

        //Caracteristicas da api
        const server = restify.createServer({
            name: "My-rest-API",
            version: '1.0.0',
            ignoreTrailingSlash: true
        })

        //faz o parser do req.body
        server.use(restify.plugins.bodyParser())

        const alunoSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            idade:{
                type:String
            }
        })

        //Cria uma collection com molde do nosso Schema já compilado
        const Aluno = mongoose.model('Aluno', alunoSchema)

        //configurando uma url e setando a sua funcao (req= pedido e res=resposta que daremos)
        server.get('/alunos', (req, resp, next) => {
            Aluno.find().then(alunos => { //Usamos como na linguagem do Mongo
                resp.json(alunos)
                return next()
            })
        })

        server.get('/alunos/:id', (req, resp, next) => {
            Aluno.findById(req.params.id).then(aluno => {
                    if (aluno) {
                        resp.json(aluno)
                    } else {
                        resp.status(404)
                        resp.json({
                            message: 'not found'})
                    }
                    return next()
                })
        })


        server.post('/alunos', (req, resp, next) => {
            let aluno = new Aluno(req.body)
            aluno.save().then(aluno => {
                resp.json(aluno)
            }).catch(error => {
                resp.status(4000)
                resp.json({
                    message: error.message
                })
            })
        })


        //iniciando a porta do servidor
        server.listen(3060, () => {
            console.log("Servidor Rodando")
        })
    }).catch(console.error)