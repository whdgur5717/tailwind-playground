import { initialize, TypeScriptWorker } from "monaco-editor/esm/vs/language/typescript/ts.worker.js"
import { URI as Uri } from "monaco-editor/esm/vs/base/common/uri.js"

class CustomTSWorker extends TypeScriptWorker {
  fileEntries = new Map()

  constructor(ctx, createData) {
    super(ctx, createData)
    console.log("[CustomTSWorker] Constructor started. Populating fileEntries...")
    this.fileEntries = new Map()
  }

  readFile(path) {
    // console.log("Reading file:", path);
    const file = super.readFile(path) || this.fileEntries.get(path)
    return file
  }

  fileExists(path) {
    const exists = super.fileExists(path) || this.fileEntries.has(path)
    return exists
  }

  getScriptFileNames() {
    const fileNames = super.getScriptFileNames().concat([...this.fileEntries.keys()])
    return fileNames
  }

  _getModel(fileName) {
    const model = super._getModel(fileName) || this.asModel(fileName)
    return model
  }

  _getScriptText(fileName) {
    const text = super._getScriptText(fileName) || this.fileEntries.get(fileName)
    return text
  }

  asModel(fileName) {
    const txt = this.fileEntries.get(fileName)
    if (!txt) {
      return null
    }
    return {
      getValue() {
        return txt
      },
      uri: Uri.parse(fileName),
      version: 1,
    }
  }

  addFile(path, content) {
    console.log(`[CustomTSWorker] Adding file dynamically: ${path}`)
    this.fileEntries.set(path, content)
  }
}

self.onmessage = e => {
  try {
    initialize((ctx, createData) => {
      console.log("[CustomTSWorker] Initializing worker...")
      return new CustomTSWorker(ctx, createData)
    })
  } catch (error) {
    console.error("[CustomTSWorker] Error during worker initialization:", error)
  }
}
