export enum ticketStatus {
  ToDo = "toDo",
  InProgress = "inProgress",
  InReview = "inReview",
  Done = "done",
}

export enum ticketType {
  Task = "task",
  Story = "story",
  Bug = "bug",
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: ticketStatus;
  type: ticketType;
}

export type JiraBoard = {
  tickets: Ticket[];
};
