# darkmode

Dependendy:
npm install darkreader

This Angular project uses the awesome DarkReader npm node module. Check them out here: https://www.npmjs.com/package/darkreader and here: https://darkreader.org/

This project consists of an Angular web UI that provides dark mode to any website via DarkReader. This project provides an angular user interface and service. It uses local storage to save the user's DarkReader preferences.

I was finally able to get DarkReader somewhat working with IE11 by adding the WeakSet.js polyfill. See below... :)

    -------------------------------------------------------------------------------

    /** IE11 WeakSet.js Polyfill - Use script: assets/WeakSet.js **/

    Modify angular.json as seen below...

            "scripts": [
              "src/assets/WeakSet.js"
            ],


    WeakSet.js polyfill code below:

    ; (function () { window.WeakSet = b; var c = Date.now() % 1E9; function b(a) { this.name = "__st" + (1E9 * Math.random() >>> 0) + (c++ + "__"); a && a.forEach && a.forEach(this.add, this) } var e = b.prototype; e.add = function (a) { var d = this.name; a[d] || Object.defineProperty(a, d, { value: !0, writable: !0 }); return this }; e["delete"] = function (a) { if (!a[this.name]) return !1; a[this.name] = void 0; return !0 }; e.has = function (a) { return !!a[this.name] }; })();

    -------------------------------------------------------------------------------
