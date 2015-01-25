describe("cdnSrcConfigurationProvider", function () {

  var provider;
  var configuration;

  beforeEach(function () {
    // Provider initialization in unit tests is explained in:
    //  https://github.com/angular/angular.js/issues/2274
    module("lvp.cdnSrc", function (cdnSrcConfigurationProvider) {
      provider = cdnSrcConfigurationProvider;
    });
    inject(function (cdnSrcConfiguration) {
      configuration = cdnSrcConfiguration;
    });
  });

  describe("cdnSrcConfigurationProvider.setCdnServers()", function () {

    it("rejects servers that do not start with one of: ['http://', 'https://, '//']", function () {
      function expectCdnServerToBeRejected(cdnServer) {
        expect(function () {
          provider.setCdnServers([cdnServer]);
        }).toThrow("cdnSrcConfiguration: Invalid CDN server url: " + cdnServer + ". " +
        "CDN server url MUST start with one of: ['http://', 'https://, '//']");
      }

      expectCdnServerToBeRejected('my.cdn.com');
      expectCdnServerToBeRejected('/my.cdn.com');
    });

  });

  describe("cdnSrcConfiguration.getCdnServers()", function () {

    it("returns the list of servers that were defined in provider.setCdnServers()", function () {
      var servers = ['https://assets1.example.com/', 'https://assets2.example.com/'];
      provider.setCdnServers(servers);
      expect(configuration.getCdnServers()).toEqual(servers);
    });

  });

});
