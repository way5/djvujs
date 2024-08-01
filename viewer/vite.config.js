import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from 'path';
import serveStatic from "serve-static";
import { create as createContentDisposition } from "content-disposition-header";
import URL from "url";
import sassDts from "vite-plugin-sass-dts";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@use "@/styles" as common;`,
                // importer(...args) {
                //     if (args[0] !== "@/styles") {
                //         return;
                //     }

                //     return {
                //         file: `${path.resolve(__dirname, "./public/styles")}`,
                //     };
                // },
            },
        },
    },
    plugins: [
        react({
            babel: {
                // plugins: ["babel-plugin-styled-components"],
            },
        }),
        sassDts({
            enabledMode: ["development", "production"],
            global: {
                generate: true,
                outputFilePath: path.resolve(__dirname, "./dist/style.d.ts"),
            },
            sourceDir: path.resolve(__dirname, "./src"),
            outputDir: path.resolve(__dirname, "./dist"),
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
        rollupOptions: {
            output: {
                entryFileNames: "djvu_viewer.js",
            },
        },
    },
    server: {
        port: 8000,
    },
}));
