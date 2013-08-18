(function(jQuery) {
  "use strict";

  function makeAbsoluteURL(baseURI, url) {
    if (url.match(/^https?:/))
      return url;
    return baseURI + url;
  }
  
  var webxrayScript = document.querySelector(".webxray"), 
    baseURI = webxrayScript.dataset.baseuri,
    lang = webxrayScript.dataset.lang,
    url = baseURI + "/strings/" + lang;

  jQuery.webxraySettings = {
    extend: jQuery.extend,
    url: function(name) {
      if (jQuery.isArray(this[name])) {
        var self = this;
        return jQuery.map(this[name], function(url) {
          return makeAbsoluteURL(self.baseURI, url);
        });
      }
      return makeAbsoluteURL(this.baseURI, this[name]);
    },
    baseURI: "",
    cssURL: "webxray.css",
    preferencesURL: "preferences.html",
    easyRemixDialogURL: "{{hostname}}/" + lang + "/easy-remix-dialog/index.html",
    uprootDialogURL: "{{hostname}}/" + lang + "/uproot-dialog.html",
    bugReportDialogURL: "bug-report-dialog.html",
    hackpubInjectionURL: "published-hack/injector.js",
    pluginURLs: [],

    hackpubURL: "{{hackpubURL}}",
    bugReportHackpubURL: "{{bugReportHackpubURL}}"
  };
})(jQuery);
