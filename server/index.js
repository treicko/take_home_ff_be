import { Octokit } from "octokit";
import express from 'express';
import axios from "axios";
import cors from "cors";
import { config } from "dotenv";

config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GITHUB_URL = "https://github.com/login/oauth/access_token";

const app = express();
const port = 8080;
let octokit;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);  
});

app.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      const token = response.data.access_token;
      res.redirect(
        `http://localhost:3000?access_token=${token}`
      );
    })
    .catch((err) => {
      console.log("********************ERROR********************");
      console.log(`Error occured ${err}`);
    });
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

app.get("/user/data", (req, res) => {
  const token = req.headers["authorization"];
  axios({
    method: "GET",
    url: ` https://api.github.com/user`,
    headers: {
      Authorization: token,
    },
  })
    .then((resp) => {
      res.statusCode = 200;
      res.send(resp.data);
    })
    .catch((err) => {
      res.status(err.response.status).json({ error: err.response.statusText });
    });
});
