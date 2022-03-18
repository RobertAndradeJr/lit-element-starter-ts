---
layout: page.11ty.cjs
title: <my-element> ⌲ Home
---

# &lt;my-element>

`<my-element>` is a replacement for the disc-graph. 

## As easy as HTML

<section class="columns">
  <div>

`<my-element>` is just an HTML element. You can it anywhere you can use HTML!

```html
<my-element width="400" border>
</my-element>
```

  </div>
  <div>

<my-element width="400" border></my-element>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<my-element>` can be configured with attributed in plain HTML.

```html
<my-element width="400" border quadrants="DS"></my-element>
```

  </div>
  <div>

<my-element width="400" border quadrants="DS"></my-element>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<my-element>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const width = 400;

render(
  html`
    <h2>This is a &lt;my-element&gt;</h2>
    <my-element .width=${width}></my-element>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;my-element&gt;</h2>
<my-element width="400"></my-element>

  </div>
</section>
