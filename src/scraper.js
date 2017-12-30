// var page = require('webpage').create();
//
// page.open('http://github.com/', function() {
//   page.render('github.png');
//   phantom.exit();
// });


/**
 * casperjs <query> <file to save as> <timeout in ms: default 5000>
 */

var casper = require('casper').create();

var query = casper.cli.args[0]
var file_save_as = casper.cli.args[1]

var timeout = 5000;

if (casper.cli.args.length>2) {
  var timeout = parseInt(casper.cli.args[2]) || 5000;
}

console.log("querying google for: " + query + " and saving to: " + file_save_as + " timeout:" + timeout);

casper.options.viewportSize = {width: 800, height: 5500};

casper.start('http://google.com/').zoom(.50)

casper.then(function() {
  this.sendKeys('input[name=q]', query, {keepFocus: true});

  //just a fancy way of having it wait 5 seconds
  this.waitFor(
    function(){ false },
    function() { console.log('weird')},
    function(){
      console.log("capturing");
      this.waitUntilVisible(".gssb_a",
        function () { this.captureSelector(file_save_as, 'html'); },
        function () { this.captureSelector('keys-fail.png', 'html'); }
      );
    },
    {timeout: 10000}
  );
});

casper.run()
