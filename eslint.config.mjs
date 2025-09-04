// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;


import eslintPluginJs from "@eslint/js";

export default [
  eslintPluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off", // 未使用変数のチェックを無効化
    },
  },
];
