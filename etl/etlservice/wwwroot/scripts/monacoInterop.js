window.initializeMonacoEditor = function (elementId, language, initialContent, dotNetHelper) {
    require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
    require(['vs/editor/editor.main'], function () {
        window.monacoEditor = monaco.editor.create(document.getElementById(elementId), {
            value: initialContent,
            language: language,
            theme: 'vs-light',
            automaticLayout: true,
            minimap: {enabled: false}
        });
        window.monacoEditor.onDidChangeModelContent(function (event) {
            const content = window.monacoEditor.getValue();
            // Send the updated content to the Blazor component
            dotNetHelper.invokeMethodAsync('UpdateField', content);
        });
        // Enable SQL IntelliSense
        if (language === 'sql') {
            monaco.languages.registerCompletionItemProvider('sql', {
                provideCompletionItems: function (model, position) {
                    // Use the dynamically loaded suggestions
                    const suggestions = window.sqlSuggestions || [];
                    return {
                        suggestions: suggestions
                    };
                }
            });
        }
    });
};
// Function to update SQL suggestions dynamically
window.updateSqlSuggestions = function (suggestions) {
    window.sqlSuggestions = suggestions;
};
window.clearSqlSuggestions = function () {
    window.sqlSuggestions = []; // Clear the suggestions array
};
window.setMonacoEditorContent = function (elementId, content) {
    if (window.monacoEditor) {
        window.monacoEditor.setValue(content);
    }
};

window.getMonacoEditorContent = function (elementId) {
    if (window.monacoEditor) {
        return window.monacoEditor.getValue();
    }
    return "";
};
// Function to get the current cursor position
window.getCursorPosition = function () {
    if (window.monacoEditor) {
        const position = window.monacoEditor.getPosition();
        return {
            lineNumber: position.lineNumber,
            column: position.column
        };
    }
    return null;
};

// Function to insert content at the cursor position
window.insertContentAtCursor = function (content) {
    if (window.monacoEditor) {
        const position = window.monacoEditor.getPosition();
        const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
        window.monacoEditor.executeEdits("insert-content", [{ range, text: content, forceMoveMarkers: true }]);
        window.monacoEditor.focus();
    }
};

// Function to replace content at the cursor position
window.replaceContentAtCursor = function (content) {
    if (window.monacoEditor) {
        const position = window.monacoEditor.getPosition();
        const range = new monaco.Range(position.lineNumber, position.column - content.length, position.lineNumber, position.column);
        window.monacoEditor.executeEdits("replace-content", [{ range, text: content, forceMoveMarkers: true }]);
        window.monacoEditor.focus();
    }
};
window.monacoEditor.languages.register({ id: 'sql' });
window.monacoEditor.languages.setMonarchTokensProvider('sql', {
    keywords: [
        'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'TABLE', 'DATABASE', 'ALTER', 'DROP', 'JOIN', 'INNER', 'OUTER', 'LEFT', 'RIGHT', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET'
    ],
    tokenizer: {
        root: [
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': 'keyword',
                    '@default': 'identifier'
                }
            }],
            [/[0-9]+/, 'number'],
            [/".*?"/, 'string'],
            [/'.*?'/, 'string']
        ]
    }
});
