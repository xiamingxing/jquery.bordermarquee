# Bordermarquee

The best jQuery plugin ever.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/root/jquery.bordermarquee/master/dist/bordermarquee.min.js
[max]: https://raw.github.com/root/jquery.bordermarquee/master/dist/bordermarquee.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.bordermarquee.min.js"></script>
<script>
jQuery(function($) {
     $('#demo').bordermarquee({
        lineStyle: "2px solid #000",
        direction: 1,
        complete: function (){
            alert("Íê³É!");
        }
    });
});
</script>
```

## Documentation
```javascript
   $.fn.bordermarquee.options = {
        punctuation: '1.0.0',
        cssText: {
            display: 'block',
            position: 'absolute',
            zIndex: 100,
            border: 'none',
            height: 0,
            width: 0
        },
        rate: 200,
        times: 3,
        autoDestroy: true,
        lineStyle: "1px solid #000",
        direction: 1,
        complete: null
    };
```

## Examples
Look example click [here][herelink]

[herelink]: http://xiamingxing.github.io/jquery.floatnavigation/demo/floatnavigation.html

## Release History
    1.0.0