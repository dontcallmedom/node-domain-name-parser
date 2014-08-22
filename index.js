exports.parse = function(name) {
    var effectiveTLDs = require('./pls.json');
    var nameComponents = name.split(".").reverse();

    var effectiveTLD = [];
    var parent = effectiveTLDs ;
    for (var i = 0; i < nameComponents.length; i++) {
        if (!parent[nameComponents[i]]) {
            break;
        }
        parent = parent[nameComponents[i]];
        effectiveTLD.push(nameComponents[i]);
    }
    // unknown TLD in public lix suffix
    if (!effectiveTLD.length) {
        effectiveTLD.push(nameComponents[0]);
    }

    return {
        tld: effectiveTLD.reverse().join("."),
        sld: nameComponents[effectiveTLD.length],
        subdomain: nameComponents.slice(effectiveTLD.length + 1).reverse().join(".")
    };
};

