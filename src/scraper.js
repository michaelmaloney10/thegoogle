// var page = require('webpage').create();
//
// page.open('http://github.com/', function() {
//   page.render('github.png');
//   phantom.exit();
// });


/**
 * casperjs <query> <file to save as> <timeout in ms: default 5000>
 */

var casper = require('casper').create({    
  viewportSize: {
      width: 1020,
      height: 880
  }
});


var query = casper.cli.args[0]
var file_save_as = casper.cli.args[1]

var timeout = 5000;

if (casper.cli.args.length>2) {
  var timeout = parseInt(casper.cli.args[2]) || 5000;
}

console.log("querying google for: " + query + " and saving to: " + file_save_as + " timeout:" + timeout);

casper.start('http://google.com/').zoom(.75)

casper.then(function() {
  this.sendKeys('input[name=q]', query, {keepFocus: true});

  //just a fancy way of having it wait 5 seconds
  this.waitFor(
    function(){ false },
    function() { console.log('weird')},
    function(){
      console.log("capturing");
      this.waitUntilVisible(".gssb_a",
        function () { this.capture(file_save_as); },
        function () { this.capture(file_save_as); }
      );
    },
    {timeout: 10000}
  );
});

casper.run()
