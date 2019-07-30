# React Application

The following steps were used to get this repo to it's initial state.

1. create-react-app
1. Install ESlint + Prettier
1. Add Lint script to package.json
1. Configure launch settings + editor

## Create react app

```npx create-react-app my-app --typescript```

## Install ESlint + Prettier

in terminal/command prompt from your app directory.

```npm i --save-dev prettier "@typescript-eslint/eslint-plugin" "@typescript-eslint/parser" "eslint-config-prettier" "eslint-config-react" "eslint-plugin-prettier" "eslint-config-airbnb" "eslint-plugin-jest" "eslint-import-resolver-typescript" "eslint-plugin-import" "eslint-plugin-react-hooks" "typescript-eslint-parser"```

## Add Lint script to package.json

```"lint": "eslint \"src/**/*.{ts,tsx}\""```

## Configure launch settings + editor

### .editorconfig

Editor configuration, see [http://editorconfig.org](http://editorconfig.org)

## Configure ESLint + Prettier

### .eslintrc.json

rules for eslint

### .prettierrc

formatting rules for prettier

### .eslintignore

like gitignore for eslint.

## configure VSCode

### settings.json

VSCode settings

### launch.json

Settings to launch debug session in Chrome
