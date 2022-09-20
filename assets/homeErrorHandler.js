function handleError(error, file, line) {
    file = file || error.fileName;
    line = line || error.lineNumber;

    const errorDiv = document.getElementById("error-text");

    const errorParagraph = document.createElement("p");
    errorParagraph.innerHTML += `Error: "${error}"`;
    if (file !== undefined) {
        errorParagraph.innerHTML += ` in file ${file} `;
        if (line !== undefined) {
            errorParagraph.innerHTML += `around line ${line}`;
        }
    }
    errorDiv.appendChild(errorParagraph);

    errorDiv.style.display = "block";
}