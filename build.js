/**
 * Used in npm scripts to copy files
 */

"use strict";

const fs = require("fs");

async function copy() {
    const buildFolder = "build/";
    const extensionFolder = "extension/dist/";
    const bundleName = buildFolder + "djvu.bundle.js";
    if (!fs.existsSync(buildFolder)) fs.mkdirSync(buildFolder);
    if (!fs.existsSync(extensionFolder)) fs.mkdirSync(extensionFolder);

    const copyToExtension = (path) => {
        const fileName = path.split("/").at(-1);
        fs.copyFileSync(path, extensionFolder + fileName);
    };

    const copyToBuild = (path) => {
        const fileName = path.split("/").at(-1);
        fs.copyFileSync(path, buildFolder + fileName);
    };

    copyToExtension("viewer/dist/djvu_viewer.js");
    copyToExtension("library/dist/djvu.js");
    copyToBuild("viewer/dist/djvu.css");

    fs.rmSync(bundleName, { force: true });

    try {
        const lib = fs.readFileSync("library/dist/djvu.js", "utf8");
        const viewer = fs.readFileSync("viewer/dist/djvu_viewer.js", "utf8");
        fs.appendFileSync(bundleName, lib);
        fs.appendFileSync(bundleName, viewer);
        console.log(`- Bundle file has been created at: ${bundleName}`);
    } catch (err) {
        throw new Error(`Error while creating bundle file: ${err.message}`);
    }

    console.info(
        "- Dist files are copied to the ./build/ and ./extension/ directories"
    );
}

async function prepareManifest(v = 2) {
    fs.copyFileSync(
        `./extension/manifest_v${v}.json`,
        `./extension/manifest.json`
    );
    console.info(`Copied manifest_v${v} to manifest.json`);
}

async function main() {
    const command = process.argv[2];

    switch (command) {
        case "copy":
            return await copy();
        case "v2":
            return prepareManifest(2);
        case "v3":
            return prepareManifest(3);
        default:
            throw new Error("Unsupported command: " + command);
    }
}

void main();
