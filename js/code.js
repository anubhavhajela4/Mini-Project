const runCodeBtn = document.getElementById("runCodeBtn");

runCodeBtn.addEventListener("click", () => {
    const code = document.getElementById("codeInput").value;
    const language = document.getElementById("langSelect").value;
    const selectedQuestion = document.getElementById("questionSelect").value;
    const outputElement = document.getElementById("output");

    // Show "Running..." status
    outputElement.textContent = "Running...";
    outputElement.style.color = "blue"; // Optional: make the text blue to indicate processing

    // Convert language selection to Piston-supported language keys
    let pistonLang;
    switch (language) {
        case "c": pistonLang = "c"; break;
        case "cpp": pistonLang = "cpp"; break;
        case "java": pistonLang = "java"; break;
        case "python3": pistonLang = "python"; break;
        default: pistonLang = "cpp";
    }

    // Get the selected problem from the JSON file
    fetch("problem.json") // adjust path if necessary
        .then(response => response.json())
        .then(problems => {
            const testCase = problems[selectedQuestion];
            const input = testCase.input;
            const expectedOutput = testCase.output;

            // Make a POST request to the Piston API for code execution
            fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language: pistonLang,
                    version: "*", // Use the latest available version
                    files: [{ content: code }],
                    stdin: input
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data); // Log the response for debugging

                if (data.run && data.run.output) {
                    const result = data.run.output.trim();
                    if (result === expectedOutput.trim()) {
                        outputElement.textContent = "Correct!";
                        outputElement.style.color = "green";
                    } else {
                        outputElement.textContent = "Wrong Output!";
                        outputElement.style.color = "red";
                    }
                } else {
                    outputElement.textContent = "Execution Error!";
                    outputElement.style.color = "red";
                }
            })
            .catch(err => {
                console.error("Error executing code:", err);
                outputElement.textContent = "Error executing code!";
                outputElement.style.color = "red";
            });
        })
        .catch(err => {
            console.error("Error loading test case:", err);
            outputElement.textContent = "Error loading test case!";
            outputElement.style.color = "red";
        });
});
