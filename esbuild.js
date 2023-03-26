const esbuild = require("esbuild");
const  { sassPlugin } = require("esbuild-sass-plugin");

esbuild
    .build({
        entryPoints: ["frontend/Application.tsx"],
        outdir: "public/assets",
        bundle: true,
        minify: true,
        
        plugins: [],
    })
    .then(() => console.log("⚡ Build complete! ⚡"))
    .catch(() => process.exit(1));