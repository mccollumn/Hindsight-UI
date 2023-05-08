# Webtrends Reporting

This is a user interface for viewing Webtrends Analytics reporting. All data is retrieved using the Data Extraction v2.0 API.

## Setup

```bash
nvm use
npm install
npm start
```

Create a `.env` file with the DX endpoint and credentials. See `.env_example` for an example.

## Build Output

- `/build` - The optimized production app. Generated with `npm run build`.
- `/installer` - Inno Setup installer script and related resources.
- `/storybook-static` - Static build of Storybook, which can be used if you want to host the site. Generated with `npm run build-storybook`.

## Versioning

Version numbers need to be updated in two places:

- `package.json`
- `/installer/wtrui.iss`

## Production Build

The Github CI workflow produces a zip file containing the app and installer, and uploads it as a Github artifact.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test-CI`

Launches the test runner with the CI environment variable set to True.
This allows the tests to run in a Windows CI workflow with watch mode disabled.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

### `npm run storybook`

Launches storybook.
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

### `npm run build-storybook`

Builds a static storybook app for hosting.
Outputs to the `storybook-static` folder.

## Documentation

- [Webtrends Data Extraction API v2.0](https://onpremises.webtrends.help/docs/about-the-data-extraction-api)
- [MUI Data Grid](https://mui.com/x/react-data-grid/) (table)
- [Nivo](https://nivo.rocks/) (graph)
