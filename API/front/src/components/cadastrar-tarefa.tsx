
import React, { useState } from "react";
import { Tarefa } from "../models/tarefa";
import axios from "axios";


function CadastrarTarefas() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await submeterProdutoAPI();
    }

     async function submeterProdutoAPI() {
   
    try {
      
      const tarefa: Partial<Tarefa> = {
        titulo,
      };
      const resposta = await axios.post("http://localhost:5000/api/tarefas/cadastrar", tarefa);
      console.log(resposta.data); 
    } catch (error : any) {
      const status = error?.response?.status; 
      if(status === 409){
        console.log("já cadastrado");
      } else {
        console.log("Erro ao cadastrar:", error);
      }
    }
  }

    return (
        <div>
            <h1>Cadastrar Tarefa</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>titulo:</label>
                    <input value={titulo} onChange={(e) => setTitulo(e.target.value)} type="text" />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        value={descricao}
                        type="text"
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarTarefas;
