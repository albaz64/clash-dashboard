import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintPluginReact from "eslint-plugin-react";
import typeScriptParser from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.{jsx,ts,tsx}"],
        languageOptions: {
            parser: typeScriptParser,
            ecmaVersion: 2020,
            sourceType: "module"
        },
        plugins: {
            "@typescript-eslint": eslintPluginTypeScript,
            "react": eslintPluginReact
        },
        rules: {
            // 你的规则
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    }
];
