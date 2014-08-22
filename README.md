# Domain name parser

This is very simple library for Node to parse a domain name into Top Level Domain / Second Level Domain / Subdomains based on the list of [effective Top Level Domains](https://publicsuffix.org/list/effective_tld_names.dat) maintained by Mozilla.

Install with `npm install effective-domain-name-parser`.

```javascript
var domainNameParser = require("effective-domain-name-parser");
console.log(domainNameParser.parse('www.example.com'));
// { tld: "com", sld: "example", "subdomain": "www" }

console.log(domainNameParser.parse('www.example.co.uk'));
// { tld: "co.uk", sld: "example", "subdomain": "www" }
```

## Updating list of effective TLDs
The list of TLDs used by the library is built with `node buildPLS.json`. This package should get updated each time the list is.