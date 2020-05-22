# darkmode

This project uses DarkReader - https://darkreader.org/

Now working with IE11.
    -------------------------------------------------------------------------------
    ***IE11 WeakSet.js Polyfill - Use script: assets/WeakSet.js

    Modify angular.json:

            "scripts": [
              "src/assets/WeakSet.js"
            ],


    WeakSet.js polyfill code:
    ; (function () { window.WeakSet = b; var c = Date.now() % 1E9; function b(a) { this.name = "__st" + (1E9 * Math.random() >>> 0) + (c++ + "__"); a && a.forEach && a.forEach(this.add, this) } var e = b.prototype; e.add = function (a) { var d = this.name; a[d] || Object.defineProperty(a, d, { value: !0, writable: !0 }); return this }; e["delete"] = function (a) { if (!a[this.name]) return !1; a[this.name] = void 0; return !0 }; e.has = function (a) { return !!a[this.name] }; })();

    -------------------------------------------------------------------------------
    ***IE11 Hack:
    Set "disableHostCheck": to true in angular.json 
    
    Example:

        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "angularTestDarkmode:build",
            "disableHostCheck": true
