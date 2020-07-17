//setando a variavel do restify
const restify = require('restify')

//Caracteristicas da api
const server = restify.createServer({
    name: "My-rest-API",
    version: '1.0.0'
})


//por enquanto vamos usar uma lista pre-salva, depois usamos o banco de dados
const alunos = [{
        id: "54a5182e-57b6-4163-ac39-e6391cf48471",
        name: "Carlos"
    },
    {
        id: "de7676f4-92c5-4f74-8ef3-2bdc1c68fa9f",
        name: "Joao"
    }
]

//configurando uma url e setando a sua funcao (req= pedido e res=resposta que daremos)
server.get('/alunos', (req, resp, next) => {
    resp.json(alunos)
})

server.get('/alunos/:id', (req, resp, next) => {
    const filtered = alunos.filter((aluno) => {
        return aluno.id === req.params.id
    })

    if (filtered.length) {
        resp.json(filtered[0])
    } else {
        resp.status(4040)
    }
    return next()
})





//iniciando a porta do servidor
server.listen(3030, () => {
    console.log("Servidor Rodando")
})