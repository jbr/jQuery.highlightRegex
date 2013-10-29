/*
 * jQuery Highlight Regex Plugin v0.1.2
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * (c) 2009-13 Jacob Rothstein
 * MIT license
 */

;(function( $ ) {



  var normalize = function( node ) {
    if ( ! ( node && node.childNodes )) return

    var children     = $.makeArray( node.childNodes )
    ,   prevTextNode = null

    $.each( children, function( i, child ) {
      if ( child.nodeType === 3 ) {
        if ( child.nodeValue === "" ) {

          node.removeChild( child )

        } else if ( prevTextNode !== null ) {

          prevTextNode.nodeValue += child.nodeValue;
          node.removeChild( child )

        } else {

          prevTextNode = child

        }
      } else {
        prevTextNode = null

        if ( child.childNodes ) {
          normalize( child )
        }
      }
    })
  }




  $.fn.highlightRegex = function( regex, options ) {

    if ( typeof regex === 'object' && regex.constructor.name !== 'RegExp' ) {
      options = regex
      regex = undefined
    }

    if ( typeof options === 'undefined' ) options = {}

    options.className = options.className || 'highlight'
    options.tagType   = options.tagType   || 'span'
    options.attrs     = options.attrs     || {}
    options.palette   = options.palette   || []

    if ( typeof regex === 'undefined' || regex.source === '' ) {

      $( this ).find( options.tagType + '.' + options.className ).each( function() {

        $( this ).replaceWith( $( this ).text() )

        normalize( $( this ).parent().get( 0 ))

      })

    } else {

      $( this ).each( function() {

        var elt = $( this ).get( 0 )

        normalize( elt )

        $.each( $.makeArray( elt.childNodes ), function( i, searchnode ) {

          var spannode, middlebit, middleclone, pos, match, parent

          normalize( searchnode )

          if ( searchnode.nodeType == 3 ) {

            while ( searchnode.data &&
                    ( pos = searchnode.data.search( regex )) >= 0 ) {

              exec = regex.exec( searchnode.data.slice( pos ) )
              index = exec.lastIndexOf(exec[0]) - 1
              match = exec[0]

              if ( match.length > 0 ) {

                spannode = document.createElement( options.tagType )
                spannode.className = options.className
                if (options.palette.length) spannode.className = spannode.className +' '+ options.palette[index % options.palette.length]
                $(spannode).attr(options.attrs)

                parent      = searchnode.parentNode
                middlebit   = searchnode.splitText( pos )
                searchnode  = middlebit.splitText( match.length )
                middleclone = middlebit.cloneNode( true )

                spannode.appendChild( middleclone )
                parent.replaceChild( spannode, middlebit )

              } else break
            }

          } else {

            $( searchnode ).highlightRegex( regex, options )

          }
        })
      })
    }

    return $( this )
  }
})( jQuery );