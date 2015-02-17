# jQuery highlightRegex plugin

Want to highlight some text on a page with information you only
know in javascript, maybe based on some dynamic input?  Check out the
[highlight v3](http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html)
by [Johann Burkard](http://johannburkard.de/).  Need to be able to do
the same thing but with a regular expression?  You're at the right
place.

## Demonstration

Check out a simple demo
[here](http://jbr.github.io/jQuery.highlightRegex)
(source included in this repository).

## Bower Installation
    `bower install jquery-highlightRegex --save`

## Usage

    $('#any.jquery.selector').highlightRegex(/[aeiou]/ig);

This would wrap all all vowels inside of `#any.jquery.selector` with a
`<span class='highlight'>`.
  
To clear the highlighting, just call `$('#any.jquery.selector').highlightRegex();` (with no argument).

If you'd like to wrap with a different sort tag and/or class, use

    $('#jquery.selector').highlightRegex( /some ([rR]egex)/, {
      tagType:   'strong',
      className: 'andHale'
    });

Additional attributes can be set on the created tag

    $('#jquery.selector').highlightRegex( /some ([rR]egex)/, {
      attrs: {'data-color': 'blue'}
    });
