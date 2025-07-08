import { TaskItemProps } from '@/types';
import Button from './ui/Button';
import Input from './ui/Input';

const TaskItem = ({ task, onDelete, onEdit, handleUpdate }: TaskItemProps) => {
  return (
    <>
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <div className="flex items-center gap-2">
        <p className="text-nowrap">
          {task.completed ? 'Completed' : 'Not Completed'}
        </p>
        <Input
          type="checkbox"
          checked={task.completed}
          onChange={() => onEdit(task.id, { completed: !task.completed })}
          className="w-4 h-4 cursor-pointer"
        />
        <Button onClick={handleUpdate}>Edit</Button>
        <Button
          className={`bg-red-500 hover:bg-red-400 w-10`}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default TaskItem;
