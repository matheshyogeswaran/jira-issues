const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const Issue = require("./issueSchema");
const axios = require("axios");

mongoose
  .connect("mongodb://127.0.0.1:27017/jira", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/issues", async (req, res) => {
  try {
    // Fetch issues from Jira
    const jiraDomain = "dreamshack.atlassian.net";
    const username = "dreamshack1999@gmail.com";
    const apiToken =
      " YOUR_API_TOKEN";
    const url = `https://${jiraDomain}/rest/api/2/search?jql=`;
    const auth = {
      username: username,
      password: apiToken,
    };
    const response = await axios.get(url, { auth: auth });
    const issues = response.data.issues;

    // Save new issues to MongoDB
    let newIssuesSaved = 0;
    for (const issue of issues) {
      const issueId = issue.id;
      const existingIssue = await Issue.findOne({ id: issueId });
      if (!existingIssue) {
        const issueData = {
          id: issueId,
          summary: issue.fields.summary,
          description: issue.fields.description,
          projectName: issue.fields.project.name,
          createdBy: issue.fields.creator.displayName,
          createdTime: issue.fields.created,
        };
        const dbIssue = new Issue(issueData);
        await dbIssue.save();
        newIssuesSaved++;
      }
    }

    res.send(`Saved ${newIssuesSaved} new issues to MongoDB`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching and saving issues");
  }
});
