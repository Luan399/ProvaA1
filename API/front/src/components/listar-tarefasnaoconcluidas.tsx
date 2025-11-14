import { useEffect, useState } from "react";
import { Tarefa } from "../models/tarefa";
import axios from "axios";

function ListarTarefasnaoconcluidas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);


    useEffect(() => {
        console.log("O componente foi carregado!");
        carregarTarefas();
    }, []);

    async function carregarTarefas() {
        try {
            const resposta = await axios.get(
                "http://localhost:5000/api/tarefas/naoconcluidas"  
            );
            setTarefas(resposta.data);
        } catch (error) {
            console.log("Erro na requisição: " + error);
        }
    }

    return (
        <div>
            <h1>Listar Tarefas</h1> 
            <table>
                <thead>
                    <tr>
                        <th>#</th>  
                        <th>titulo</th>
                        <th>status</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa) => (
                        <tr key={tarefa.id}>
                            <td>{tarefa.id}</td>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.status}</td>
                          
                            
                            <td>
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarTarefasnaoconcluidas;