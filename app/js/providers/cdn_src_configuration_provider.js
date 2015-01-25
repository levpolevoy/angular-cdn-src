angular.module('lvp.cdnSrc')
  .provider('cdnSrcConfiguration', function () {

    var cdnServers = [];

    /**
     * Set the list of CDN servers that will be prepended to URLs.
     *
     * Note that every CDN server path MUST start with one of:
     *  - http://
     *  - https://
     *  - //
     *
     * @param newCdnServers
     */
    this.setCdnServers = function (newCdnServers) {
      cdnServers = [];
      newCdnServers.forEach(function (server) {
        if (!isValidCdnServerUrl(server)) {
          throw new Error("cdnSrcConfiguration: Invalid CDN server url: " + server + ". " +
          "CDN server url MUST start with one of: ['http://', 'https://, '//']");
        }
        cdnServers.push(server);
      });
    };

    this.$get = function () {
      return {
        /**
         * Get the list of CDN servers
         *
         * @returns {Array}
         */
        getCdnServers: function () {
          return cdnServers;
        }
      };
    };

    function isValidCdnServerUrl(cdnServer) {
      return cdnServer.indexOf('http') === 0 || cdnServer.indexOf('//') === 0;
    }

  });
