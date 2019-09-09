Component intended to display the contents of a rich text editor in the back-end CMS connected to Irving. By default, there are two options for markup display:

* **Rich Text:** Can display just about any markup
* **Plain Text:** Can display select inline text formatting elements

These two options can be reconfigured or eliminated as necessary.

```js
<RawHTML
    rich={true}
    content="<p>This is a bunch of HTML!</p><p>It was probably <em>edited</em> or <strong>generated</strong> by a rich text editor in your CMS</p>"
/>
```
