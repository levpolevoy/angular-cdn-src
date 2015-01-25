# angular-cdn-src
An AngularJS module that automatically prepends *src* attributes with CDN server paths.

[![Build Status](https://circleci.com/gh/levpolevoy/angular-cdn-src.png)](https://circleci.com/gh/levpolevoy/angular-cdn-src)
TODO: DEMO

# Instructions

1. `bower install angular-cdn-src --save`
2. Add *bower_components/angular-cdn-src/dist/js/***angular-cdn-src.dist.js** to your page or to your build tool (grunt, gulp, etc...)
3. Add the module to your angular application: `angular.module('myApp', ['lvp.cdnSrc'])`
4. [Configure CDN servers](#configure-cdn-servers)
5. Add the *cdn-src* attribute to a *img* element
```html
  <img cdn-src src="img1.png">
```

# Configuration

## <a name="configure-cdn-servers"></a>Set CDN Servers

Since CDN usage is application specific, you must set the list of CDN server in any application that uses the `cdn-src` directive.

```javascript
angular.module('myApp').config(function(cdnSrcConfigurationProvider) {
  cdnSrcConfigurationProvider.setCdnServers([
    '//cdn1.example.com', 
    '//cdn2.example.com'
  ]);
});
```
## Setting CDN servers

# Use cases

## Automatically prepend CDN to every img[src] attribute

Just add a directive (`cdn-src`) to img tags instead of maintaining the same prefix for all image files.

## Automatically distribute image loads between several CDN mirrors

Browsers limit the number of concurrent connections that can be made to every host. Mirroring assets and serving
them from multiple hosts is an old trick that can make your website load faster.

# Alternatives

1. https://github.com/tactivos/grunt-cdn

# Development

1. `git clone `
2. `npm install && bower install`
3. `lineman spec`

# Release

1. Update CHANGELOG.md and commit it (`git add CHANGELOG.md`)
2. `git rm -f dist`
3. `lineman build`
4. `git add -f dist`
5. `git commit -m "Release [version number]"`
6. `git tag [version number]`

Start working on the next version:

1. Update *package.json*
2. Update *bower.json*
5. `git commit -m "Starting [version number]" --allow-empty`
6. `git push origin master --tags`
