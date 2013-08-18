(function(jQuery) {
  "use strict";

  function makeAbsoluteURL(baseURI, url) {
    if (url.match(/^https?:/))
      return url;
    return baseURI + url;
  }

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
    language: "en",  // effect english-only for now
    baseURI: "",
    cssURL: "webxray.css",
    preferencesURL: "preferences.html",
    easyRemixDialogURL: Localized.getCurrentLang() + "/easy-remix-dialog/index.html",
    uprootDialogURL: Localized.getCurrentLang() + "/uproot-dialog.html",
    bugReportDialogURL: "bug-report-dialog.html",
    hackpubInjectionURL: "published-hack/injector.js",
    pluginURLs: [],

    hackpubURL: "{{hackpubURL}}",
    bugReportHackpubURL: "{{bugReportHackpubURL}}"
  };
})(jQuery);
