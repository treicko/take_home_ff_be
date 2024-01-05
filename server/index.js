import express from 'express';
import cors from "cors";
import Repositories from "./modules/repositories/api.js";
import Authenticate from "./modules/authentication/api.js";
import { ServiceError } from "./core/services/github/errorHandler.js"

const app = express();
const port = 8080;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);  
});

Authenticate.registerModule(app);
Repositories.registerModule(app);

app.use((err, req, res, next) => {
  let statusCode = 500;
  const error = {
      message: err.message
  };
  
  if (err instanceof ServiceError) {
    statusCode = err.status;
  }

  res.status(statusCode).json(error);
});
