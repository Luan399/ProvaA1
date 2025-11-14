import { useEffect, useState } from "react";
import { Tarefa } from "../models/tarefa";
import axios from "axios";

function ListarTarefa() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    
    useEffect(() => {
        console.log("O componente foi carregado!");
        carregarTarefas();
    }, []);

    async function carregarTarefas() {
        try {
            const resposta = await axios.get(
                "http://localhost:5000/api/tarefas/listar" 
            );
            setTarefas(resposta.data);
        } catch (error) {
            console.log("Erro na requisição: " + error);
        }
    }
    async function alterarTarefas(id: string) {
        try {
            const resposta = await axios.patch(`http://localhost:5000/api/tarefas/alterar/${id}`);

            carregarTarefas();
        } catch (error) {
            console.log("Erro ao alterar a tarefa: " + error);
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
                        
                        
                        
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa) => (
                        <tr key={tarefa.id}>
                            <td>{tarefa.id}</td>
                            <td>{tarefa.titulo}</td>
                            
                            
                        <td>
                                <button onClick={() => alterarTarefas(tarefa.id)}>Alterar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarTarefa;