"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IncrementingTile = function () {

    /**
     * Initialize new instance with provided settings and targeted element if any. Tile will be injected in the body
     * of the document if no target is provided.
     *
     * @param settings {Object} Configuration for the tile
     * @param [target] {HTMLElement} Parent element to inject tile into.
     */
    function IncrementingTile(settings, target) {
        _classCallCheck(this, IncrementingTile);

        this.settings = settings || IncrementingTile.defaults;
        this.target = target || document.body;
        this.tile = null;

        this.generate();
        this.tick();
    }

    /**
     * Generate the tile interface based on provided settings
     */


    _createClass(IncrementingTile, [{
        key: "generate",
        value: function generate() {

            var template = "<div class=\"inc-tile\">\n            <div class=\"inc-tile-top\"></div>\n            <div class=\"inc-tile-center\"></div>\n            <div class=\"inc-tile-bottom\"></div>\n        </div>";

            var wrap = document.createElement("div");
            wrap.innerHTML = template;

            this.tile = wrap.firstChild;

            this.target.appendChild(this.tile);
        }

        /**
         * Start the timer that take care of the number incrementation
         */

    }, {
        key: "tick",
        value: function tick() {}
    }]);

    return IncrementingTile;
}();

IncrementingTile.defaults = {
    formatting: "thousands", // thousands / millions / none
    value: 1000,
    delay: 500
};
