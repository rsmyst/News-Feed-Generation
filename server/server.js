// const { spawn } = require("child_process");
// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const port = 5000;

// app.post("/extract-keywords", (req, res) => {
//   const doc = req.body.description;
//   const childPython = spawn("python", ["key.py", doc]);

//   let keywords = "";

//   childPython.stdout.on("data", (data) => {
//     keywords += data.toString();
//   });

//   childPython.stderr.on("data", (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   childPython.on("close", (code) => {
//     console.log(`Python process exited with code ${code}`);
//     try {
//       const parsedKeywords = JSON.parse(keywords.replace(/'/g, '"'));
//       res.json({ keywords: parsedKeywords });
//     } catch (error) {
//       console.error("Error parsing keywords:", error);
//       res.status(500).json({ error: "Failed to process keywords" });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const port = 3005;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post("/getKeywords", (req, res) => {
  const inputData = JSON.stringify(req.body);

  // Spawn a Python process
  const python = spawn("python", ["key.py", inputData]);

  let dataBuffer = ""; // To collect data chunks

  // Capture the output from the Python script
  python.stdout.on("data", (data) => {
    dataBuffer += data.toString();
  });

  // Handle when the Python process finishes
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

  // Capture any errors
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
