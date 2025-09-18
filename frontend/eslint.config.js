import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import playwright from "eslint-plugin-playwright";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "build/**",
      "dist/**",
      "**/assets/*.js",
      "node_modules/**",
      ".react-router/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    ...js.configs.recommended,
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
      globals: {
        fetch: "readonly",
        React: "readonly",
        navigator: "readonly",
        window: "readonly",
        document: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-floating-promises": "error",
    },
    settings: {
      react: { version: "detect", pragma: "React", jsxPragma: "React" },
    },
  },
  {
    files: ["tests/e2e/**/*.ts"],
    ...playwright.configs["flat/recommended"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
    },
  },
]);
