import { Editor } from "@fatal_error/editor";

export function makeCanvas(canvasID, stageID, templateData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const config = {
                width: parseInt(templateData.props.cellWidth),
                height: parseInt(templateData.props.cellHeight),
                container: canvasID,
                containerWrapper: stageID,
                pageHeight: parseInt(templateData.props.pageHeight),
                pageWidth: parseInt(templateData.props.pageWidth),
                dragging: false,
                readOnly: true,
            };

            const editor = new Editor(config);
            editor.readOnly = true;

            window.widget = editor;
            editor.fitIntoContainer();
            editor.fitIntoContainer();
            window.addEventListener("resize", function () {
                editor.fitIntoContainer()
            });

            let data = templateData;
            let store = templateData.props;

            editor.editorWidth = parseInt(store.cellWidth);
            editor.editorHeight = parseInt(store.cellHeight);
            // Import data from local storage
            try {
                editor.ImportData.source(data.data);
                setTimeout(() => {
                    editor.transform.nodes([]);
                    editor.fitIntoContainer();
                    editor.selectEvent.data = null;
                    document.dispatchEvent(editor.selectEvent);
                    resolve();
                }, 100);

                editor.fitIntoContainer();
            } catch (e) {
                reject(e)
            }
        }, 100);
    });
}
