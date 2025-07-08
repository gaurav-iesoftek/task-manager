'use client';
import { deleteTask, getTasks, updateTask } from '@/lib/api';
import { Task } from '@/types';
import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [updateTask, setUpdateTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const onEdit = async (
    id: string,
    data: { title?: string; completed?: boolean }
  ) => {
    const response = await updateTask(id, data);
    if (!response) {
      setError('Failed to update task');
      return;
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };
  
  const onToggle = (id: string, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  const onDelete = async (id: string) => {
    const response = await deleteTask(id);
    if (!response) {
      setError('Failed to delete task');
      return;
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center bg-white min-h-80 rounded-2xl">
        <p className="text-neutral-800 font-semibold ">No tasks available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-4 scroll-auto bg-white min-h-80 max-h-100 overflow-y-auto rounded-2xl">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center p-4 border-b border-blue-500 bg-blue-50 gap-2 rounded-md"
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
