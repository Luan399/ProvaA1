import React from 'react';
import ListarTarefa from './components/listar-tarefa';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ListarTarefasconcluidas from './components/listar-tarefasconcluidas';
import ListarTarefasnaoconcluidas from './components/listar-tarefasnaoconcluidas';
import CadastrarTarefas from './components/cadastrar-tarefa';


function App() {
  return (
    <div>
        <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tarefa/listar"> Listar Tarefas </Link>  muda o caminho conferme for a api
            </li>
            <li>
              <Link to="/tarefa/listarconcluidas"> Listar Tarefas concluidas </Link>  muda o caminho conferme for a api
            </li>
            <li>
              <Link to="/tarefa/listarnaoconcluidas"> Listar Tarefas nao concluidas </Link>  muda o caminho conferme for a api
            </li>
            <li>
              <Link to="/tarefa/cadastrartarefas"> cadastrar tarefas </Link>  muda o caminho conferme for a api
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListarTarefa/>} />   mudar para a função que fazer na api 
          <Route path="/tarefa/listar" element={<ListarTarefa/>} />
          <Route path="/" element={<ListarTarefasconcluidas/>} />   mudar para a função que fazer na api 
          <Route path="/tarefa/listarconcluidas" element={<ListarTarefasconcluidas/>} /> {/* mudar a url /tarefa/listarconcluidas */}
          <Route path="/" element={<ListarTarefasnaoconcluidas/>} />   mudar para a função que fazer na api 
          <Route path="/tarefa/listarnaoconcluidas" element={<ListarTarefasnaoconcluidas/>} /> {/* mudar a url /tarefa/listarconcluidas */}
          <Route path="/" element={<CadastrarTarefas/>} />   mudar para a função que fazer na api 
          <Route path="/tarefa/cadastrartarefas" element={<CadastrarTarefas/>} /> 
        </Routes>
        <footer>
          Rodapé da aplicação
        </footer>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;