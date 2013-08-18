(function(jQuery) {
  "use strict";

  var $ = jQuery;
  var MAX_URL_LENGTH = 35;
  
  jQuery.hudOverlay = function hudOverlay(options) {
    if (options === undefined)
      options = {};

    var hudContainer = $('<div class="webxray-base webxray-hud-box"></div>');
    var hud = $('<div class="webxray-base webxray-hud"></div>');

    hudContainer.append(hud);
    
    function showDefaultContent() {
      hud.html(options.defaultContent || Localized.get("default-html"));
    }

    showDefaultContent();

    return {
      overlayContainer: hudContainer[0],
      overlay: hud[0],
      destroy: function destroy() {
        this.overlay = null;
        hudContainer.remove();
        hudContainer = null;
        hud = null;
      },
      onFocusChange: function handleEvent(focused) {
        function code(string) {
          return $("<code></code>").text(string);
        }

        function elementInfo(element) {
          var info = {
            tagName: "<" + element.nodeName.toLowerCase() + ">",
            id: element.id,
            className: element.className,
            url: element.href || element.src || element.action ||
                 element.currentSrc
          };
          
          if (info.url && info.url.length)
            info.url = $.shortenText(info.url, MAX_URL_LENGTH);
          else
            info.url = null;
            
          return info;
        }
        
        function elementDesc(element) {
          var span = $("<span></span>");
          var info = elementInfo(element);
          var shortDescKey = "short-element-descriptions:" +
                             element.nodeName.toLowerCase();

          if (Localized.has(shortDescKey))
            span.emit(code(info.tagName),
                      " (" + Localized.get(shortDescKey) + ") ",
                      Localized.get("element"));
          else
            span.emit(code(info.tagName), " ", Localized.get("element"));
          if (info.id)
            span.emit(" ", Localized.get("with"), " ", Localized.get("id"), " ",
                      code(info.id));
          if (info.className)
            span.emit(" " + (info.id ? Localized.get("and") : Localized.get("with")),
                      " ", Localized.get("class"), " ",
                      code(info.className));
          if (info.url) {
            span.emit((info.id || info.className) ? "," : "",
                      " ", Localized.get("pointing-at"), " ",
                      $('<span class="webxray-url"></span>').text(info.url));
          }
          return span;
        }

        if (focused.element) {
          var span = $("<span></span>");
          span.emit(Localized.get("focused-intro"), " ",
                    elementDesc(focused.element), ".");
          if (focused.ancestor)
            span.emit(" ", Localized.get("ancestor-intro"), " ",
                      elementDesc(focused.ancestor), ".");
          hud.empty().append(span);
        } else
          showDefaultContent();
      }
    };
  };
})(jQuery);
