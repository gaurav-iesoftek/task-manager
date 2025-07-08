const API_URL = 'http://localhost:8081/api';

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/task`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

export const createTask = async (title: string) => {
  const res = await fetch(`${API_URL}/task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const updateTask = async (
  id: string,
  data: { title?: string; completed?: boolean }
) => {
  const res = await fetch(`${API_URL}/task/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_URL}/task/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete Task');
  return res.json();
};
