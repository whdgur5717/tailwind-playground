import { observer } from "mobx-react-lite"
import tailwindBrowserScript from "../raw/browser?raw"
import { editorStore } from "../store/editor"

const defaultPackages = {
	react: "https://esm.sh/react",
	"react/": "https://esm.sh/react/",
	"react-dom": "https://esm.sh/react-dom",
	"react-dom/": "https://esm.sh/react-dom/",
	"esbuild-wasm": "https://esm.sh/esbuild-wasm",
}
const Preview = ({ className }: { className?: string }) => {
	const { files } = editorStore

	const previewScript = `
import * as esbuild from 'esbuild-wasm';

try {
  await esbuild.default.initialize({
    worker: true,
    wasmURL: 'https://esm.sh/esbuild-wasm/esbuild.wasm',
  });

  const files = new Map(${JSON.stringify(files)})
  const mainCode = files.get("main.tsx")?.content
	
  const result = await esbuild.default.build({
    stdin: {
      contents: mainCode,
      loader: 'tsx',
      resolveDir: 'file:///',
      sourcefile: 'main.tsx'
    },
    bundle: true,
    format: 'esm',
    jsx: 'automatic',
    jsxImportSource: 'react',
    write: false,
	plugins: [
    {
      name: 'virtual-fs',
      setup(build) {
   
        build.onResolve({ filter: new RegExp('^react/jsx-runtime$')}, () => {
          return { path: 'https://esm.sh/react/jsx-runtime', external: true }
        });

        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.path.startsWith('http') || args.path.startsWith('https')) {
            return { external: true };
          }
          return { path: args.path, namespace: 'virtual-fs' };
        });
        
        // 파일 내용 로드
        build.onLoad({ filter: /.*/, namespace: 'virtual-fs' }, (args) => {
          console.log(args)
          const file = files.get(args.path) || files.get(args.path.slice(2));
          if (!file) return { contents: console.error("File not found: args.path")};
          
          // 로더 결정
          const loader = file.name.endsWith('.css') ? 'css' : 
                        file.name.endsWith('.tsx') ? 'tsx' : 
                        file.name.endsWith('.ts') ? 'ts' : 'js';
                        
          return { contents: file.content, loader };
        });
      }
    }
  ]
  });

 
  const oldScript = document.getElementById('preview-script');
  if (oldScript) oldScript.remove();
  const root = document.getElementById('root');
  if (root) root.innerHTML = '';

  const script = document.createElement('script');
  script.setAttribute('type', 'module');
  script.setAttribute('id', 'preview-script');
  script.textContent = result.outputFiles[0].text;
  document.head.appendChild(script);
} catch (e) {
  console.error("Error in preview script:", e);
  const errorDiv = document.createElement('pre');
  errorDiv.style.color = 'red';
  errorDiv.textContent = e.message + '\\n' + e.stack;
  document.body.innerHTML = '';
  document.body.appendChild(errorDiv);
}`.trim()

	const sources = {
		imports: defaultPackages,
	}

	return (
		<iframe
			title="preview"
			className={className}
			srcDoc={`
		<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Preview</title>
	<script>${tailwindBrowserScript}</script>
    <script type="importmap">
      ${JSON.stringify(sources, null, 2)}
    </script>
    <script type="module">
      ${previewScript}
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
		`}
		/>
	)
}

export default observer(Preview)
