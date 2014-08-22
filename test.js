var expect = require("expect.js")
var domainNameParser = require("./index.js");

var buildDomainNameDataObj = function (components) {
    var tld = components[0];
    var sld = components[1];
    var sub = components[2] || "";
    return {tld: tld, sld: sld, subdomain: sub};

};

var tests = [
    {desc: "simple domain name", inp: "www.example.org",
     out: ["org", "example", "www"]
    },
    {desc: "simple domain name, no subdomain", inp: "example.org",
     out: ["org", "example"]
    },
    {desc: "multiple subdomain", inp: "we.love.subdomains.example.org",
     out: ["org", "example", "we.love.subdomains"]
    },
    {desc: "long tld", inp: "www.example.ap-southeast-2.compute.amazonaws.com",
     out: ["ap-southeast-2.compute.amazonaws.com", "example", "www"]
    },
    {desc: "I18N tld", inp: "www.example.娱乐",
     out: ["娱乐", "example", "www"]
    },
    {desc: "unknown tld", inp: "www.example.qsdfjqsldfkjqmlsdkjf",
     out: ["qsdfjqsldfkjqmlsdkjf", "example", "www"]
    },

];

tests.forEach(function (test) {
    describe('Testing ' + test.desc + ' ' + test.inp, function () {
        it('should parse ' + test.inp + ' correclty', function () {
            expect(domainNameParser.parse(test.inp)).to.be.eql(buildDomainNameDataObj(test.out));
        });
    });
});