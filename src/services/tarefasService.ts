export const salvarTarefasNoDB = (usuarioId: string, tarefas: any[]) => {
  const key = `tarefas_${usuarioId}`;
  localStorage.setItem(key, JSON.stringify(tarefas));
};

export const carregarTarefasDoDB = (usuarioId: string) => {
  const key = `tarefas_${usuarioId}`;
  const dados = localStorage.getItem(key);
  return dados ? JSON.parse(dados) : [];
};

export async function limparTarefasDoDB(usuarioId: string) {
  await fetch(`/api/tarefas/${usuarioId}`, { method: "DELETE" });
}