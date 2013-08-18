(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.Localized = factory();
    }
}(this, function () {

  var _strings,
      _readyCallback,
      _isReady = false,
      _requestedStrings = false;

  function ready( data ) {
     _readyCallback = _readyCallback || function(){};

    function domReady() {
      // If the DOM isn't ready yet, repeat when it is
      if ( document.readyState !== "complete" ) {
        document.onreadystatechange = domReady;
        return;
      }
      document.onreadystatechange = null;
      _strings = data;
      _isReady = true;
      _readyCallback();
    }

    domReady();
  }

  // Get the current lang from the document's HTML element, which the
  // server set when the page was first rendered. This saves us having
  // to pass extra locale info around on the URL.
  function getCurrentLang() {
    var html = document.querySelector( "html" );
    return html && html.lang ? html.lang : "en-US";
  }
  
  var Localized = {

    has: function( key ) {
      if ( !_strings ) {
        console.error( "[goggles.webmaker.org] Error: string catalog not found." );
        return "";
      }
      return _strings[ key ] ? true : false;
    },

    get: function( key ) {
      if ( !_strings ) {
        console.error( "[goggles.webmaker.org] Error: string catalog not found." );
        return "";
      }
      return ( _strings[ key ] || "" );
    },

    getCurrentLang: getCurrentLang,

    // Localized strings are ready
    ready: function( cb ) {
      if ( !_requestedStrings ) {
        _requestedStrings = true;
        _readyCallback = cb;

        function onload( data ) {
          ready( data );
        }
        onload.error = console.log;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/strings/' + getCurrentLang() + '?bust=' + Date.now(), false);
        xhr.send(null);
        if (xhr.status !== 200) {
          err = new Error(id + ' HTTP status: ' + status);
          err.xhr = xhr;
          onload.error(err);
          return;
        }
        onload(JSON.parse(xhr.responseText));
      };
      if ( _isReady ) {
        _readyCallback();
      }
    },

    isReady: function() {
      return !!_isReady;
    }
  };
  return Localized;
}));
Localized.ready(function(){});
