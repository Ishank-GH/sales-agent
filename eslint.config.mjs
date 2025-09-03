import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

export default [
  //ignore generated files and node_modules
  {
    ignores: ["**/node_modules/**", "src/generated/**"]
  },

  //Apply Next.js recommend rules
    ...compat.extends("next/core-web-vitals", "next/typescript"),

];
