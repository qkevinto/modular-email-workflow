# Modular Email Workflow

A simple modular email workflow built with [`gulp`](https://www.npmjs.com/package/gulp) that also supports MailChimp's [template styling language](http://templates.mailchimp.com/getting-started/template-language/) by preserving styles in `<style></style>` and CSS comments in the header whilst also automatically inlining styles for best compatibility.

## Features

- Supports MailChimp template styling language
- Two basic responsive templates from [MailChimp Email Blueprints](https://github.com/mailchimp/Email-Blueprints) are included and modularised, add any of your own template if needed
- Simple modular templating using [`gulp-nunjucks-render`](https://www.npmjs.com/package/gulp-nunjucks-render)

## Getting started

1. `npm install` to install dependencies
2. Run `npm start` to start serving templates with style injection and auto reload using a [BrowserSync](http://www.browsersync.io/) server or `npm build` to just simply build the templates

## How it works

### Structure

```
├── source
    └── style/         # Styles
        └── partials/  # Sass partials
    └── templates/     # Templates
        └── snippets/  # Snippets, modular sections to include into templates
```

### Snippets

Snippets keep your template modularised and allow for consistent repeatable structures.

Snippets can be included into templates using [nunjucks](http://mozilla.github.io/nunjucks/)' include syntax:

```html
<table border="0" cellpadding="0" cellspacing="0" class="container">
  {% include "preheader.html" %}
  {% include "header.html" %}
  {% include "columns.html" %}
  {% include "body.html" %}
  {% include "footer.html" %}
</table>
```
To add more snippets, simply place a `.html` file into the `./source/templates/snippets` directory and don't forget to include it into your template.

### Styles

Styles are stored in `./source/styles`, and organised into partials in `./source/styles/partials`.

CSS is linked to templates with `<link inline rel="stylesheet" href="../styles/main.css" />` in template header. Link tags will be resolved and styles automatically injected and inlined by [`gulp-inline-css`](https://www.npmjs.com/package/gulp-inline-css) when `gulp build` is executed.

### Building

To build templates run `npm build`. All `*.html` template files in `./source/templates` will be built and placed into `./dist/templates`. Templates will have styles in header along with all comments and styles inlined into respective html elements for best compatibility.

====

Released under the [MIT License](LICENSE). © Kevin To (http://kevinto.me)
