import { useState, useEffect } from "react"; //State -> banco de dados, Effect -> Define quando determinadas funções serão executadas
import axios from 'axios' //Estabelece conexão com o servidor

function App() {
  const [tarefas, settarefas] = useState([]) //"tarefas" vai guardar a lista, começa vazia [], "settarefas" vai poder mudar isso pois pode alterá-la
  const [novatarefa, setnovatarefa]= useState("") // mesmo rolê, mas vai guardar o que for digitado no input 
  //tanto tarefas quanto novatarefa vieram do node

  useEffect(() => { //Ele faz a ponte pro backend, quando ele aparecer na tela pela 1° vez "buscartarefas()" vai ser executado
    buscartarefas()
  }, []) //[] faz ele executar apenas 1 vez

  async function buscartarefas() {
    const resposta = await axios.get('http://localhost:3333/tarefas') //async e await esperam a resposta chegar pra evitar erros //axios.get pede a lista atual pro node
    settarefas(resposta.data) //pega o array "tarefas" recebido do node e coloca dentro de ".data", e o settarefas, quando a lista muda, mostra a lista atualizada automaticamente
  }

  async function adicionartarefa() {
    if(!novatarefa.trim()) return //Se tiver mandado algo vazio o return para função e não envia nada pro servidor
    await axios.post('http://localhost:3333/tarefas', { //o axios cria no node uma nova tarefa
      novatarefa: novatarefa //Aqui está a tarefa criada, que será criada
    })

    setnovatarefa("") //limpa o imput pro usuário poder escrever uma nova tarefa
    buscartarefas() // O react busca a lista atualizada agora que uma nova tarefa foi adicionada, e mostra ela na tela
  }

  return (
  <div>

    <h1>Lista de Tarefas</h1>

    <div>

    <input type="text" placeholder="Digite uma nova tarefa..." value={novatarefa} onChange={(e) => setnovatarefa(e.target.value)}/> 
    <button onClick={adicionartarefa}>Adiconar</button>



    </div>

    <ul> 
    {tarefas.map((item, index) => ( 
      <li key={index}>{item}</li> 
      //"ul" cria lista com ordem irrelevante //"tarefas.map()" pra cada item em "tarefas", executa o código entre parênteses
      // //"li" é um elemento da lista 
      //"{item}" cria uma linha na lista com o texto da item presente em "tarefas"
      //"key={index}" Faz com que cada item tenha um id
    ))}
  </ul>

  </div>

  
)
}

export default App