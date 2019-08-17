Heading helper component. Used to consolidate heading styles and markup into a single component. By default the heading component has styles for a basic type ramp.

```js
<Heading
    className="test"
    typeStyle="step-up-six"
    tag="h1"
>
    This is a heading
</Heading>
<Heading
    className="test"
    typeStyle="step-up-five"
    link="https://www.duckduckgo.com"
    tag="h2"
>
    This is a heading
</Heading>
<Heading
    className="test"
    typeStyle="step-up-four"
    tag="h3"
>
    <span>This is a <em>heading</em></span>
</Heading>
<Heading
    className="test"
    typeStyle="step-up-three"
    tag="h4"
>
    This is a heading
</Heading>
<Heading
    className="test"
    typeStyle="step-up-two"
    tag="h5"
>
    This is a heading
</Heading>
<Heading
    className="test"
    typeStyle="step-up-one"
    tag="h6"
>
    This is a heading
</Heading>
```