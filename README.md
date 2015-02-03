# Modular Email Workflow

A simple modular email framework that supports MailChimp's template styling language by preserving styles in `<style></style>` tags and CSS comments.

## Features

- [`gulp`](https://www.npmjs.com/package/gulp)
- [`gulp-sass`](https://www.npmjs.com/package/gulp-sass)
- Supports MailChimp template styling language
- Responsive templates from [MailChimp Email Blueprints](https://github.com/mailchimp/Email-Blueprints) are included and modularised
- Simple modular templating using [`gulp-nunjucks-render`](https://www.npmjs.com/package/gulp-nunjucks-render)

## Getting started

1. `npm install` to install dependencies
2. Run `gulp` to start serving templates with style injection and auto reload using BrowserSync

## How it works

Core template files are stored in `./core` (do not edit these). These will be copied to `./source` for editting, the first time `gulp` or `gulp build` tasks are executed:

```
├── source
    └── style/         # Styles
        └── partials/  # Sass partials
    └── templates/     # Templates
        └── snippets/  # Snippets, modular sections to include into templates
```

Snippets can be included into templates using the nunjucks include syntax:

```html
<table border="0" cellpadding="0" cellspacing="0" class="container">
  {% include "preheader.html" %}
  {% include "header.html" %}
  {% include "columns.html" %}
  {% include "body.html" %}
  {% include "footer.html" %}
</table>
```

Styles are stored in `./source/styles`, and organised into partials in `./source/styles/partials`.

CSS is linked to templates with `<link inline rel="stylesheet" href="../styles/main.css" />` in template header. Link tags will be resolved and styles automatically injected and inlined by [`gulp-inline-css`](https://www.npmjs.com/package/gulp-inline-css) when `gulp build` is executed.

To build templates run `gulp build`. Built template `*.html` files will be in stored `./dist/templates`. Templates will have styles in header along with all comments and styles inlined into respective html elements.
