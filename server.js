const { spawn } = require("child_process");

// Document string to be passed to the Python script
const doc =
  "Supervised learning is the machine learning task of learning a function that maps an input to an output based on example input-output pairs.";

// Spawn the Python process and pass the document string as an argument
const childPython = spawn("python", ["key.py", doc]);

// Listen for data from the Python script
childPython.stdout.on("data", (data) => {
  console.log(data.toString());
});

// Listen for errors from the Python script
childPython.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

// Listen for the Python script to exit
childPython.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
