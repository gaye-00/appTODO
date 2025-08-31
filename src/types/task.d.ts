import { User } from "./auth";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: User;
  projectId: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: Task["priority"];
  dueDate: string;
  assignedToId: string;
  projectId: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: Task["status"];
}
