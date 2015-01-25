(function () {

  angular.module('lvp.cdnSrc')
    .directive('cdnSrc', function (cdnSrcConfiguration) {
      return {
        restrict: 'A',
        link: function ($scope, elem) {

          if (cdnSrcConfiguration.getCdnServers().length === 0) {
            throw new Error("cdnSrc: No CDN Server is defined. " +
            "Please define servers using the cdnSrcConfigurationProvider");
          }

          $scope.$watch(function () {
            return elem.attr('src');
          }, function () {
            onSrcAttrChange(elem, cdnSrcConfiguration);
          });

        }
      };
    });

  /**
   * Calculate a hash value for a string 's'.
   *
   * The actual algorithm doesn't matter too much as our goal is just to have a reasonable distribution
   * of matches between elements and CDN servers.
   * The distribution doesn't have to be optimal.
   *
   * The current implementation is to just to add all of the 'char' values of the characters that are part of
   * the string.
   *
   * @param s
   * @returns hash value (integer)
   */
  function calcHash(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) {
      h = h + s.charCodeAt(i);
    }
    return h;
  }

  function startsWith(str, prefix) {
    // string.startsWith() is only added in ES6, but this module is expected to work with earlier versions.
    // My solution is very simple, but also inefficient in the generic use case.
    // In this specific use case, in the vast majority of executions we will get indexOf(...) == 0,
    // and that should be the least amount of work that the indexOf function has to do.
    // Disclosure: I did not profile this function.
    return str.indexOf(prefix) === 0;
  }

  function isFullUrl(url) {
    return startsWith(url, '//') || startsWith(url, 'http://') || startsWith(url, 'https://');
  }

  function onSrcAttrChange(elem, cdnSrcConfiguration) {
    var current = elem.attr('src');
    if (current !== undefined && !isFullUrl(current)) {
      elem.attr('src', cdnifyUrl(current, cdnSrcConfiguration));
    }
  }

  function cdnifyUrl(url, cdnSrcConfiguration) {
    return getCdnServerForUrl(url, cdnSrcConfiguration) + '/' + url;
  }

  function getCdnServerForUrl(url, cdnSrcConfiguration) {
    var servers = cdnSrcConfiguration.getCdnServers();
    if (servers.length === 1) {
      // No need to do hash calculation if only one server is defined.
      return servers[0];
    } else {
      var hash = calcHash(url);
      return servers[hash % servers.length];
    }
  }

})();
