const vscode = require('vscode');
const { GoogleGenerativeAI } = require("@google/generative-ai");


function getApiKey() {
  const config = vscode.workspace.getConfiguration('myExtension');
  return config.get('apiKey');
}

const API_KEY =  getApiKey();

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function generateContent(text){
    try {
        const prompt = `You are acting as a co-pilot in an editor.
                         Your task is only to generate the corresponding code or task asked for
                        ,and don't generate useless things.
                        The code must be executable, 
                        and do not add a language name at the beginning 
                        or dont add other signs(special chars) at the start and end.
                        make sure comments in code are minimum as possible
                    Required: ${text}
                    Response as a co - pilot :
                    `;
        const result = await model.generateContent([prompt]);
        // console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        return "Error generating content"; // Return a fallback message on error
    }
}
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.custom_copilot', async () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            // Get the selected text
            const selectedText = document.getText(selection);
            const prompt = selectedText;

            try {
                // Await the result of generateContent
                const backendResponse = await generateContent(prompt);

                // Insert the backend response directly below the selected code
                editor.edit(editBuilder => {
                    const position = new vscode.Position(selection.end.line + 1, 0);
                    editBuilder.insert(position, '\n' + backendResponse + '\n');
                });
            } catch (error) {
                vscode.window.showErrorMessage('Error generating content: ' + error.message);
            }
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
