var request = require("request");
var fs = require("fs");

var plsUrl = "https://publicsuffix.org/list/effective_tld_names.dat";

request(plsUrl ,
         function(err, response, body) {
             var pls = {};
             if (!err && response.statusCode === 200) {
                 body.split("\n").forEach(function (line) {
                     if (line.match(/^\/\//) || line === "") {
                         return;
                     }
                     var tld = line.trim().split(".").reverse();
                     var parent = pls;
                     for (var i = 0; i < tld.length ; i++) {
                         if (!parent[tld[i]]) {
                             parent[tld[i]] = {};
                         }
                         parent = parent[tld[i]];
                     }
                 });
                 fs.writeFileSync("pls.json", JSON.stringify(pls, null, 2));
             } else {
                 console.error("Failed to load " + plsUrl);
             }
         });
