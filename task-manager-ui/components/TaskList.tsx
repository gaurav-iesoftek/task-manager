'use client';
import { getTasks } from '@/lib/api';
import { Task } from '@/types';
import { useEffect, useState } from 'react';
import Button from './ui/Button';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col gap-4 scroll-auto max-h-100 overflow-y-auto">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center p-4 border-b border-neutral-200 bg-white gap-2 rounded-md"
        >
          <h3>{task.title}</h3>
          <div className="flex items-center gap-2">
            <p className="text-nowrap">
              {task.completed ? 'Completed' : 'Not Completed'}
            </p>
            <Button className="bg-red-500 hover:bg-red-400 w-10">Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
