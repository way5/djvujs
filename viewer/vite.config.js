import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import serveStatic from "serve-static";
import { create as createContentDisposition } from "content-disposition-header";
import URL from "url";
import sassDts from "vite-plugin-sass-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

// Ref.: https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    css: {
        preprocessorOptions: {
            scss: {},
        },
    },
    plugins: [
        react({
            babel: {},
        }),
        sassDts({
            enabledMode: ["development", "production"],
            sourceDir: path.resolve(__dirname, "./src"),
            outputDir: path.resolve(__dirname, "./dist")
        }),
        viteStaticCopy({
            targets: [
                {
                    src: './src/app.scss',
                    dest: '',
                    rename: (name, extension, fullPath) => `djvu.${extension}`
                },
            ],
        }),
        {
            name: "custom-middlewares",
            configureServer(server) {
                server.middlewares.use("/djvufile", (req, res, next) => {
                    const query = URL.parse(req.url, true).query;
                    const contentDispositionType = query.cd || "inline";
                    let filename = query.fname || "TheMap.djvu";
                    const cdHeader = createContentDisposition(filename, {
                        type: contentDispositionType,
                    });
                    res.setHeader("Content-Disposition", cdHeader);

                    fs.createReadStream("../library/assets/carte.djvu").pipe(
                        res
                    );
                });

                server.middlewares.use(serveStatic("../library/assets"));
            },
        }
    ],
    build: {
        assetsDir: "",
        minify: "terser",
        cssMinify: "terser",
        reportCompressedSize: false,
        copyPublicDir: false,
        terserOptions: {
            compress: {
                defaults: true,
            },
            ie8: true,
            safari10: true,
        },
        rollupOptions: {
            input: {
                app: "./index.html",
            },
            output: {
                assetFileNames: (a) => {
                    if (a.name === "app.css") return "djvu.css";
                    else if (a.name === "index.js") return "djvu_viewer.js";
                    else if (a.name === "app.scss") return "djvu.scss";
                    else return a.name;
                },
                entryFileNames: "djvu_viewer.js",
            },
        },
    },
    server: {
        port: 8000,
    },
}));
