/* Exports a function which returns an object that overrides the default &
 *   plugin grunt configuration object.
 *
 * You can familiarize yourself with Lineman's defaults by checking out:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/application.coffee
 *   - https://github.com/linemanjs/lineman/blob/master/config/plugins
 *
 * You can also ask Lineman's about config from the command line:
 *
 *   $ lineman config #=> to print the entire config
 *   $ lineman config concat.js #=> to see the JS config for the concat task.
 */
module.exports = function (lineman) {
  //Override application configuration here. Common examples follow in the comments.
  return {
    // grunt-angular-templates assumes your module is named "app", but
    // you can override it like so:
    //
    ngtemplates: {
       options: {
         // angular-cdn-src does not need ngtemplates, but unfortunately lineman-angular forces us to use ngtemplates.
         // To make sure that we angular-cdn-src never overrides some other module's ngtemplates we set a module
         // name for ngtemplates, but be aware that it has no actual use by angular-cdn-src.
         module: "lvp.cdnSrc"
       }
    }
  };
};
