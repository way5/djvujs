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
            scss: {
                api: "modern",
            },
        },
    },
    plugins: [
        react({
            babel: {},
        }),
        sassDts({
            enabledMode: ["development", "production"],
            sourceDir: path.resolve(__dirname, "./src"),
            outputDir: path.resolve(__dirname, "./dist"),
        }),
        viteStaticCopy({
            targets: [
                {
                    src: "./src/app.scss",
                    dest: "",
                    rename: (name, extension, fullPath) => `djvu.${extension}`,
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
        },
    ],
    build: {
        minify: "terser",
        cssMinify: "terser",
        assetsDir: "",
        cssCodeSplit: false,
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
                    if (a.names.includes("style.css")) return "djvu.css";
                    else return a.names[0];
                },
                entryFileNames: "djvu_viewer.js",
            },
        },
    },
}));
