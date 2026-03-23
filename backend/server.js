const express = require('express') //Express é o "motor" que lida com requisições de internet
const cors = require('cors') //Cors faz com que o React "converse" com o servidor

const app = express() //criou o servidor, "app"
app.use(cors()) //criou cors como uma middleware
app.use(express.json()) //Converte os dados em json

let tarefas = ["estudar node", "configurar o git"] //"Banco de dados" temporário (lista)

app.get('/tarefas', (req, res) => { //define o que acontece quando "get" é requirido no endereço /tarefas
    return res.json(tarefas) //retorna (res) a listagem (array) no formato json
})

app.post('/tarefas', (req, res) => { //O que acontece quando usar post no endereço /tarefas (cria algo novo)
    const { novatarefa } = req.body // a "tarefa" estabelecida pelo usuario, desestruturar faz com que apenas "novatarefa" seja buscada no body
    
    if(!novatarefa || novatarefa.trim() === "") { //se não tiver tarefa ou se a tarefa mandada for espaço vazio
        return res.status(400).json(console.log("Tarefa não encontrada!")) //retorna isso
    } else { //se tiver
    tarefas.push(novatarefa) //envia a nova tarefa pra lista
    return res.status(201).json({message: "Foi!"}) // Mostra que tudo ta joia
    }
})

app.listen(3333, () => {console.log("Servidor ta rodando!")}) //Define o localhost e a arrow function mostra uma msg quando o server roda