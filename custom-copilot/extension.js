
const vscode = require('vscode');
const axios = require('axios'); // Import axios for HTTP requests

function activate(context) {
    // Register the command and its implementation
    let disposable = vscode.commands.registerCommand('extension.custom_copilot', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            // Get the selected text
            const selectedText = document.getText(selection);

            // Send the selected text to the backend Python server
            axios.post('http://localhost:5000/process', { text: selectedText })
                .then(response => {
                    const backendResponse = response.data.responseText; // Assume the server returns a 'responseText' field

                    // Insert the backend response directly below the selected code
                    editor.edit(editBuilder => {
                        const position = new vscode.Position(selection.end.line + 1, 0);
                        editBuilder.insert(position, '\n' + backendResponse + '\n');
                    });
                })
                .catch(error => {
                    vscode.window.showErrorMessage('Error communicating with backend: ' + error.message);
                });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
