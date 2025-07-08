import AddTaskForm from '@/components/AddTaskForm';
import TaskList from '@/components/TaskList';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="container mx-auto mt-10">
      <h1 className="text-4xl font-semibold">Task Manager</h1>
      <div className="flex justify-start w-full mt-10">
        <AddTaskForm />
      </div>
      <div>
        <h2 className='text-3xl font-semibold my-5' >Tasks</h2>
        <TaskList />
      </div>
    </main>
  );
}
