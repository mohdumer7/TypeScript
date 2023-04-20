import { RequestHandler } from "express";
import { Todo } from "../models/todo";
// export const createTodo = (req:Request, res:Response, next:NextFunction) => {};
const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const newTodo = new Todo(Math.random.toString());
};
