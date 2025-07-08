import AddTaskForm from '@/components/AddTaskForm';
import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <main className="container mx-auto mt-10">
      <div className="mx-4">
        <h1 className="text-4xl font-semibold">Task Manager</h1>
        <div className="flex justify-start w-full mt-10">
          <AddTaskForm />
        </div>
        <div>
          <h2 className="text-3xl font-semibold my-5">Tasks</h2>
          <TaskList />
        </div>
      </div>
    </main>
  );
}
