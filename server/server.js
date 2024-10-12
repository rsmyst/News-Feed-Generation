const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/getKeywords", (req, res) => {
  const inputData = JSON.stringify(req.body);

  const python = spawn("python", ["key.py", inputData]);

  let dataBuffer = ""; 

  python.stdout.on("data", (data) => {
    dataBuffer += data.toString();
  });

  python.on("close", (code) => {
    if (code === 0) {
      try {
        const keywords = JSON.parse(dataBuffer);
        res.json(keywords); // Send the keywords back to the front end
      } catch (error) {
        console.error("Error parsing Python output:", error);
        res
          .status(500)
          .json({ error: "Failed to parse response from Python script." });
      }
    } else {
      res
        .status(500)
        .json({ error: "Python process failed with code " + code });
    }
  });

  python.stderr.on("data", (data) => {
    console.error(`Python error: ${data.toString()}`);
    if (!res.headersSent) {
      res.status(500).json({
        error: "An error occurred while processing the Python script.",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
