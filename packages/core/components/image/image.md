Responsive image component. 

Image component with srcset/sizes and lazyloading
```js
<Image
    alt="Fringilla orci vivamus sit cras"
    aspectRatio={0.6667}
    className="image"
    height={200}
    lqipSrc="https://picsum.photos/30/20"
    src="https://picsum.photos/300/200"
    srcset="https://picsum.photos/300/200 200w"
    sizes="https://picsum.photos/300/200 200w, 100vw"
    lazyload
    picture={false}
/>
```

Image component with picture tag and lazyloading
```js
<Image
    alt="Fringilla orci vivamus sit cras"
    aspectRatio={0.6667}
    className="image"
    height={200}
    lqipSrc="https://picsum.photos/30/20"
    srcset=""
    sizes=""
    src="https://picsum.photos/300/200"
    sourceTags={[
        { srcset: 'https://picsum.photos/300/200 200w', media: '(max-width: 960px)'},
        { srcset: 'https://picsum.photos/600/400 400w', media: '(min-width: 960px)'},
    ]}
    picture
    lazyload
/>
````