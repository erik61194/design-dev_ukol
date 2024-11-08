### Install

1. Install **NodeJS** and **npm**
2. Run `npm install`

### Use tasks

|                | Task Name                                    | Description                                               | Environment |
| -------------- | :------------------------------------------- | :-------------------------------------------------------- | :---------- |
| :construction: | `npm run dev` or `gulp`                     | Compile dev build, start the server and watch for changes | Development |
| :factory:      | `npm run build` or `gulp build --production` | Compile production build                                  | Production  |

## File structure

```
|-- dist
|-- tasks
|-- src
|   |-- fonts
|   |-- img
|   |   |-- favicon
|   |   |   |-- logo.png
|   |   |-- content (optional)
|   |   |-- main (optional)
|   |   |-- svg-sprite
|   |-- js
|   |   |-- components
|   |   |-- other
|   |   |-- app.js
|   |   |-- main.js
|   |-- styles
|   |   |-- components
|   |   |-- main.scss
|   |   |-- _app.scss
|   |   |-- _variables.scss
|   |-- views
|   |   |-- data
|   |   |-- helpers
|   |   |-- partials
|   |   |-- templates
|   |   |   |-- pages
|   |   |   |-- index.html
|-- .babelrc.js
|-- .browserslistrc
|-- .gitignore
|-- gulpfile.babel.js
|-- package.json
|-- webpack.config.js
```

- `dist` - folder with the finished results for October CMS.

## Copyright and license

Copyright 2022 Plutus digital, s.r.o. under the [MIT license](http://opensource.org/licenses/MIT).
