'use client';
import { deleteTask, getTasks, updateTask } from '@/lib/api';
import { Task } from '@/types';
import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import Button from './ui/Button';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popup, setPopup] = useState<boolean>(false);
  const [editData, setEditData] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);

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

  if (popup && editData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Edit Task</h2>
          <input
            className="border p-2 mb-2 w-full"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={editCompleted}
              onChange={(e) => setEditCompleted(e.target.checked)}
            />
            Completed
          </label>
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                if (!editData) return;
                await onEdit(editData.id, {
                  title: editTitle,
                  completed: editCompleted,
                });
                setPopup(false);
                setEditData(null);
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setPopup(false);
                setEditData(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
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
            handleUpdate={() => {
              setEditData(task);
              setEditTitle(task.title);
              setEditCompleted(task.completed);
              setPopup(true);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
