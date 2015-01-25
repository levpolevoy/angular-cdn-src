describe("directive: cdn-src", function () {

  var $rootScope;
  var $compile;

  function getSrcAttributeValue(elem) {
    return elem[0].getAttribute('src');
  }

  function expectSrcToBePrependedWithAnAddressOfACdnServer(elem, originalSrcValue) {
    expect(getSrcAttributeValue(elem).indexOf(originalSrcValue)).toBeGreaterThan(0);
  }

  function buildImgElementWithCdnSrc(partialUrl) {
    return buildElement('<img ng-src="' + partialUrl + '" cdn-src>');
  }

  function buildElement(html) {
    var scope = $rootScope.$new();
    var elem = $compile(html)(scope);
    scope.$digest();
    return elem;
  }

  describe("When the configuration is valid", function () {

    beforeEach(function () {
      // Provider initialization in unit tests is explained in:
      //  https://github.com/angular/angular.js/issues/2274
      module("lvp.cdnSrc", function (cdnSrcConfigurationProvider) {
        cdnSrcConfigurationProvider.setCdnServers(['//1.cdn.com', '//2.cdn.com']);
      });
    });

    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    }));

    it("prepends the URL in 'src' with a CDN server", function () {
      var elem = buildImgElementWithCdnSrc('url/to/img1.png');
      expectSrcToBePrependedWithAnAddressOfACdnServer(elem, 'url/to/img1.png');
    });

    it("does nothing if no 'src' attribute is defined for the element", function () {
      var elem = buildImgElementWithCdnSrc('');
      expect(getSrcAttributeValue(elem)).toEqual(null);
    });

    it("uses a different CDN server for every element", function () {
      var src1 = getSrcAttributeValue(buildImgElementWithCdnSrc('img.png1'));
      var src2 = getSrcAttributeValue(buildImgElementWithCdnSrc('img.png2'));

      // The CDN server selected for each url depends of the value of a hash function on the name.
      // The following matches correspond to the algorithm in the current hash function.
      expect(src1.indexOf('//2.cdn.com')).toEqual(0);
      expect(src2.indexOf('//1.cdn.com')).toEqual(0);
    });

  });

  describe("When the configuration is invalid", function () {

    describe("because there were no servers defined", function () {
      it("throws an error", function () {
        // Initialize the module but don't make any modifications to the default configuration.
        // The default configuration contains an empty servers list.
        module("lvp.cdnSrc");

        inject(function (_$rootScope_, _$compile_) {
          $rootScope = _$rootScope_;
          $compile = _$compile_;
        });

        expect(function () {
          buildImgElementWithCdnSrc('image.png');
        }).toThrow("cdnSrc: No CDN Server is defined. Please define servers using the cdnSrcConfigurationProvider");

      })
    })
  });

});
