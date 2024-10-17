let problems = [];

window.onload = function() {
    fetch('problem.json')
        .then(response => response.json())
        .then(data => {
            problems = data;
            const problemSelect = document.getElementById("problemSelect");
            problems.forEach(problem => {
                let option = document.createElement("option");
                option.value = problem.id;
                option.textContent = problem.title;
                problemSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading problems:', error));
};

function loadProblem() {
    const selectedProblemId = parseInt(document.getElementById("problemSelect").value);
    const problem = problems.find(p => p.id === selectedProblemId);

    if (problem) {
        document.getElementById("problemTitle").textContent = problem.title;
        document.getElementById("problemDescription").textContent = problem.description;
        document.getElementById("problemInput").textContent = problem.input;
        document.getElementById("problemOutput").textContent = problem.output;
        document.getElementById("problemExample").textContent = problem.example;
        document.getElementById("problemDetails").style.display = "block";
    } else {
        document.getElementById("problemDetails").style.display = "none";
    }
}

function runCode() {
    const code = document.getElementById("codeEditor").value;
    const language = document.getElementById("language").value;
    const outputElement = document.getElementById("output");

    outputElement.innerHTML = "Running...";

    let languageMapping = {
        "cpp": "cpp",
        "python": "python3",
        "java": "java"
    };

    const payload = {
        language: languageMapping[language],
        version: "*", 
        files: [{ content: code }]
    };

    fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.run && data.run.stdout) {
            outputElement.innerHTML = data.run.stdout;
        } else if (data.run && data.run.stderr) {
            outputElement.innerHTML = "Error: " + data.run.stderr;
        } else {
            outputElement.innerHTML = "Something went wrong.";
        }
    })
    .catch(error => {
        outputElement.innerHTML = "Error: " + error.message;
    });
}
