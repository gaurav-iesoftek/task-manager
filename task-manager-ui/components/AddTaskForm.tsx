'use client';
import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { createTask } from '@/lib/api';

const AddTaskForm = () => {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.trim()) {
        setError('Task title cannot be empty');
        return;
      }
      await createTask(formData);
      setFormData('');
      setError(null);
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task');
    }
  };
  return (
    <form
      className="border border-neutral-200 p-4 rounded-md shadow-md bg-white w-80 h-60 mx-auto"
      onSubmit={handleSubmit}
    >
      <Input
        label="Title"
        type="text"
        name="taskName"
        value={formData}
        onChange={(e) => setFormData(e.target.value)}
      />
      {error && (
        <p className="text-red-500 mt-1 text-xs font-semibold">{error}</p>
      )}
      <div className="mt-4 w-full">
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
};

export default AddTaskForm;
