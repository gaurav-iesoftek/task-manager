export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, body: { title?: string; completed?: boolean }) => void;
  handleUpdate: () => void
}
