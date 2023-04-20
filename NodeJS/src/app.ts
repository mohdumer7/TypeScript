import express, { NextFunction, Request, Response } from "express";

import todoRoutes from "./routes/todos";

const app = express();
const port = 3000;

app.use("/todos", todoRoutes);

app.use(
  (err: Error, req: express.Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: error.message });
  }
);

app.listen(port);
