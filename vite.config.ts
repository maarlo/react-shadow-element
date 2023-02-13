import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import typescript from "@rollup/plugin-typescript";
import * as packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react()
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            fileName: "index",
            formats: ["es"],
        },
        rollupOptions: {
            external: [...Object.keys(packageJson.peerDependencies)],
            plugins: [
                typescriptPaths({
                    preserveExtensions: true,
                }),
                typescript({
                    sourceMap: false,
                    declaration: true,
                    outDir: "dist",
                }),
            ],
        },
    },
});
