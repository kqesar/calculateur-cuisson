import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'indent': ["error", 2],
      
      'import/extensions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-boolean-value': ['error', 'never'],
      'arrow-body-style': ["error", "as-needed"],
      'prefer-const': 'error',
      "react/react-in-jsx-scope": "off",

      "react/jsx-max-props-per-line": ["error", { maximum: 1 }],
    },
    settings: {
      react: {
        version: 'detect',
      },
      "import/resolver": {
        "typescript": {}
      }
    },
  }
];
