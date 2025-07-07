import { Request, Response } from 'express';

interface ITask {
  id: string;
  title: string;
  completed: boolean;
}
export const tasks: ITask[] = [];

export const getTasks = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: tasks,
      message: 'Tasks retrieved successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrive tasks',
    });
  }
};

export const postTasks = (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    if (!title || title.trim() === '') {
      res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const newTask: ITask = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
    };
    tasks.push(newTask);

    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Task created Successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
    });
  }
};

export const updateTasks = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (title !== undefined) {
      if (title.trim() === '') {
        res.status(400).json({
          success: false,
          message: 'Title cannot be empty',
        });
      }
      tasks[taskIndex].title = title.trim();
    }

    if (completed !== undefined) {
      tasks[taskIndex].completed = Boolean(completed);
    }
    res.status(200).json({
      success: true,
      data: tasks[taskIndex],
      message: 'Task updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
    });
  }
};

export const deleteTaskById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
      success: true,
      data: deletedTask,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
    });
  }
};
