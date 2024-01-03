import { Octokit } from "octokit";
import express from 'express';

const app = express();
const port = 3000;
let octokit;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);  
});

app.post('/authenticate', async (req, res) => {
  try {
    const {
      body: { git_hub_access_token } = null
    } = req;

    if (!git_hub_access_token) {
      throw new Error("'git_hub_access_token' must be defined");
    }

    octokit = new Octokit({
      auth: git_hub_access_token
    });

    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    res.status(200).json({
      git_hub_access_token,
      login
    });
  } catch (error) {
    res.status(400).json({ error: String(error) });
  }
});