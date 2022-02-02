import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";


var layout;
var sourceEditor;
var stdinEditor;
var stdoutEditor;
var stderrEditor;
var $selectLanguage;


var layoutConfig = {
    settings: {
        showPopoutIcon: false,
        reorderEnabled: true
    },
    dimensions: {
        borderWidth: 3,
        headerHeight: 22
    },
    content: [{
        type: "row",
        content: [{
            type: "component",
            componentName: "code area",
            title: "CODE AREA",
            isClosable: false,
            componentState: {
                readOnly: false
            },
            width: 60
        }, {
            type: "column",
            content: [{
                type: "stack",
                content: [{
                    type: "component",
                    componentName: "stdin",
                    title: "STDIN",
                    isClosable: false,
                    componentState: {
                        readOnly: false
                    }
                }, {
                    type: "component",
                    componentName: "stdout",
                    title: "STDOUT",
                    isClosable: false,
                    componentState: {
                        readOnly: true
                    }
                }, {
                    type: "component",
                    componentName: "stderr",
                    title: "STDERR",
                    isClosable: false,
                    componentState: {
                        readOnly: true
                    }
                }]
            }]
        }]
    }]
};

$(document).ready(function () {
    require(["vs/editor/editor.main"], function (ignorable, App, DB ) {
        layout = new GoldenLayout(layoutConfig, $("#ide-windows"));

        layout.registerComponent("code area", function (container, state) {
                sourceEditor = monaco.editor.create(container.getElement()[0], {
                    automaticLayout: true,
                    theme: "vs-dark",
                    scrollBeyondLastLine: true,
                    readOnly: state.readOnly,
                    language: "java",
                    minimap: {
                        enabled: false
                    }
                });

        });

        layout.registerComponent("stdin", function (container, state) {
            stdinEditor = monaco.editor.create(container.getElement()[0], {
                automaticLayout: true,
                theme: "vs-dark",
                scrollBeyondLastLine: false,
                readOnly: state.readOnly,
                language: "plaintext",
                minimap: {
                    enabled: false
                }
            });
        });

        layout.registerComponent("stdout", function (container, state) {
            stdoutEditor = monaco.editor.create(container.getElement()[0], {
                automaticLayout: true,
                theme: "vs-dark",
                scrollBeyondLastLine: false,
                readOnly: state.readOnly,
                language: "plaintext",
                minimap: {
                    enabled: false
                }
            });

            container.on("tab", function(tab) {
                tab.element.append("<span id=\"stdout-dot\" class=\"dot\" hidden></span>");
                tab.element.on("mousedown", function(e) {
                    e.target.closest(".lm_tab").children[3].hidden = true;
                });
            });
        });

        layout.registerComponent("stderr", function (container, state) {
            stderrEditor = monaco.editor.create(container.getElement()[0], {
                automaticLayout: true,
                theme: "vs-dark",
                scrollBeyondLastLine: false,
                readOnly: state.readOnly,
                language: "plaintext",
                minimap: {
                    enabled: false
                }
            });

            container.on("tab", function(tab) {
                tab.element.append("<span id=\"stderr-dot\" class=\"dot\" hidden></span>");
                tab.element.on("mousedown", function(e) {
                    e.target.closest(".lm_tab").children[3].hidden = true;
                });
            });
        });

        
        layout.on("initialised", function () {
            $("#upper-container").css("border-bottom", "1px solid black");
            sourceEditor.focus();
        });
        
        layout.init();
    });


    const firebaseConfig = 
    {
        apiKey: "AIzaSyDICcooHUciQZvAs_dPpExVxqBhtJMojbY",
        authDomain: "codelab-database-1.firebaseapp.com",
        projectId: "codelab-database-1",
        storageBucket: "codelab-database-1.appspot.com",
        messagingSenderId: "573387563239",
        appId: "1:573387563239:web:161f23412c218ba50ac242",
        measurementId: "G-4XTVC35JQL"
        };

        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const dataRef  = ref(database, 'Edits/');


        onValue(dataRef, function(data){
            sourceEditor.setValue(data.val().userEdit)
        });
        
        sourceEditor.getModel().onDidChangeContent(()=>{
            set(dataRef, {userEdit : sourceEditor.getValue()})
        });

 
});