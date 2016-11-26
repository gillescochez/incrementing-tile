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

        this.settings = Object.assign({}, IncrementingTile.defaults, settings);
        this.increment = this.settings.amountPerSecond / (1000 / this.settings.interval);
        this.target = target || null;
        this.interval = null;
        this.elements = {};

        this.generate();

        if (this.settings.increment) {
            this.tick();
        }
    }

    /**
     * Generate the tile interface based on provided settings
     */


    _createClass(IncrementingTile, [{
        key: "generate",
        value: function generate() {
            var _settings = this.settings,
                cssClass = _settings.cssClass,
                top = _settings.top,
                centerPrefix = _settings.centerPrefix,
                centerSuffix = _settings.centerSuffix,
                bottom = _settings.bottom,
                amount = _settings.amount,
                increment = _settings.increment;

            var template = "<div class=\"inc-tile " + cssClass + "\">\n            <div class=\"inc-tile-top\">" + top + "</div>\n            <div class=\"inc-tile-center\">\n                <span>" + centerPrefix + "</span>\n                <span class=\"inc-tile-amount\">\n                    " + (increment ? 0 : IncrementingTile.format(amount, this.settings.formatter)) + "\n                </span>\n                <span>" + centerSuffix + "</span>\n            </div>\n            <div class=\"inc-tile-bottom\">" + bottom + "</div>\n        </div>";

            var wrap = document.createElement("div");
            wrap.innerHTML = template;

            this.elements = IncrementingTile.queryElements(wrap.firstChild);

            if (this.target) {
                this.target.appendChild(this.elements.tile);
            }
        }
    }, {
        key: "update",
        value: function update() {

            this.elements.amount.__value = (this.elements.amount.__value || 0) + this.increment;
            this.elements.amount.innerText = IncrementingTile.format(this.elements.amount.__value, this.settings.formatter);

            if (this.settings.amount <= this.elements.amount.__value) {
                this.tick();
            }
        }

        /**
         * Start the timer that take care of the number incrementation
         */

    }, {
        key: "tick",
        value: function tick() {
            var _this = this;

            if (this.interval) {
                clearInterval(this.interval);
            }

            if (this.settings.amount > (this.elements.amount.__value || 0)) {
                this.interval = setInterval(function () {
                    return _this.update();
                }, this.settings.interval / this.settings.speed);
            } else {
                if (this.settings.continuous) {
                    this.interval = setInterval(function () {
                        return _this.update();
                    }, this.settings.interval);
                }
            }
        }
    }]);

    return IncrementingTile;
}();

/**
 * Format the amount given based on the formatter provided. The amount is rounded first and is the value returned if
 * no formatter was provided or found.
 *
 * @param amount {Number} The number to format
 * @param formatter {String} The formatter to use
 * @returns {*}
 */


IncrementingTile.format = function (amount, formatter) {

    amount = Math.round(amount < 1 ? 1 : amount);

    if (IncrementingTile.hasOwnProperty(formatter + "Formatter")) {
        return IncrementingTile[formatter + "Formatter"](amount);
    } else {
        return amount;
    }
};

/**
 * Format the given amount per thousands
 * @param amount {Number} The number to format
 * @returns {string}
 */
IncrementingTile.thousandsFormatter = function (amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Query the elements inside a tile and return an object containing the tile and its children as properties.
 * @param tile {Element} The tile (parent) element
 * @returns {{tile: Element, amount: Element, top: Element, center: Element, bottom: Element}}
 */
IncrementingTile.queryElements = function (tile) {

    return {
        tile: tile,
        amount: tile.querySelector(".inc-tile-amount"),
        top: tile.querySelector(".inc-tile-top"),
        center: tile.querySelector(".inc-tile-center"),
        bottom: tile.querySelector(".inc-tile-bottom")
    };
};

/**
 * List of default options
 * @type {{formatting: string, amount: number, amountPerSecond: number, continuous: boolean, static: boolean, interval: number, cssClass: string, top: string, center: string, bottom: string}}
 */
IncrementingTile.defaults = {
    formatter: "thousands", // thousands / millions / false
    amount: 10000, // amount to reach
    amountPerSecond: 150, // amount to increase the value per second
    continuous: true, // If true the tile will keep counting using the amountPerSecond value
    increment: true, // If false the tile will not count and simply render the amount
    interval: 500, // Interval use to refresh the number
    speed: 5, // Amount used to reach the full amount faster
    cssClass: "", // CSS class to add to the root tile element for custom styling
    top: "", // Text/HTML to inject into the top element
    centerPrefix: "", // Text/HTML to inject into the center element in front of the number
    centerSuffix: "", // Text/HTML to inject into the center element after the number
    bottom: "" // Text/HTML to inject into the bottom element
};
