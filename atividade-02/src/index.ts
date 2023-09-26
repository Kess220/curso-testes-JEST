import express, { Request, Response } from "express";

const app = express();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK!");
});

const port = 6000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

export default app;
