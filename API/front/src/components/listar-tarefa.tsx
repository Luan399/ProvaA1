// ...existing code...
import { useEffect, useState } from "react";
import axios from "axios";

interface Tarefa {
  tarefaId?: string; // backend provável
  id?: string;       // caso venha assim
  titulo: string;
  status: string;
}

const CICLO_STATUS = ["Não iniciada", "Em progresso", "Concluída", "Cancelada"];

function proximoStatus(atual: string) {
  const i = CICLO_STATUS.indexOf(atual);
  return i === -1 || i === CICLO_STATUS.length - 1 ? CICLO_STATUS[0] : CICLO_STATUS[i + 1];
}

function ListarTarefa() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [msg, setMsg] = useState("");

  async function carregar() {
    setMsg("");
    try {
      const r = await axios.get("http://localhost:5000/api/tarefas/listar");
      setTarefas(r.data);
    } catch {
      setMsg("Erro ao listar.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function alterar(tId: string) {
    setMsg("");
    const tarefa = tarefas.find(t => (t.tarefaId || t.id) === tId);
    if (!tarefa) return;
    const novoStatus = proximoStatus(tarefa.status);

    try {
      // Se sua API espera PATCH use axios.patch
      await axios.put(`http://localhost:5000/api/tarefas/alterar/${tId}`, {
        status: novoStatus
      });
      await carregar();
    } catch (e: any) {
      console.error(e?.response?.data || e);
      setMsg("Erro ao alterar.");
    }
  }

  return (
    <div>
      <h2>Tarefas</h2>
      <button onClick={carregar}>Recarregar</button>
      {msg && <p>{msg}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map(t => {
            const id = t.tarefaId || t.id || "";
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{t.titulo}</td>
                <td>{t.status}</td>
                <td>
                  <button onClick={() => alterar(id)}>Alterar status</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListarTarefa;
// ...existing code...