class IncrementingTile {

    /**
     * Initialize new instance with provided settings and targeted element if any. Tile will be injected in the body
     * of the document if no target is provided.
     *
     * @param settings {Object} Configuration for the tile
     * @param [target] {HTMLElement} Parent element to inject tile into.
     */
    constructor(settings, target) {

        this.settings = Object.assign({}, IncrementingTile.defaults, settings);
        this.increment = this.settings.amountPerSecond / (1000 / this.settings.interval);
        this.target = target || document.body;
        this.interval = null;
        this.elements = {};

        this.generate();

        if (!this.settings.static) {
            this.tick();
        }
    }

    /**
     * Generate the tile interface based on provided settings
     */
    generate() {

        let {cssClass, top, center, bottom} = this.settings;
        let template = `<div class="inc-tile ${cssClass}">
            <div class="inc-tile-top">${top}</div>
            <div class="inc-tile-center">${center}<span class="inc-tile-amount">0</span></div>
            <div class="inc-tile-bottom">${bottom}</div>
        </div>`;

        let wrap = document.createElement("div");
        wrap.innerHTML = template;

        this.elements = IncrementingTile.queryElements(wrap.firstChild);
        this.target.appendChild(this.elements.tile);
    }

    update() {

        this.elements.amount.__value = (this.elements.amount.__value || 0) + this.increment;
        this.elements.amount.innerText = IncrementingTile.format(this.elements.amount.__value, this.settings.formatter);

        if (this.settings.amount <= parseInt(this.elements.amount.innerText)) {
            this.tick();
        }
    }

    /**
     * Start the timer that take care of the number incrementation
     */
    tick() {

        if (this.interval) {
            clearInterval(this.interval);
        }

        if (this.settings.amount > parseInt(this.elements.amount.innerText)) {
            this.interval = setInterval(() => this.update(), this.settings.interval / this.settings.speed);
        } else {
            if (this.settings.continuous) {
                this.interval = setInterval(() => this.update(), this.settings.interval);
            }
        }
    }
}

/**
 * Format the amount given based on the formatter provided. The amount is rounded first and is the value returned if
 * no formatter was provided or found.
 *
 * @param amount {Number} The number to format
 * @param formatter {String} The formatter to use
 * @returns {*}
 */
IncrementingTile.format = (amount, formatter) => {

    amount = Math.round(amount);

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
IncrementingTile.thousandsFormatter = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Query the elements inside a tile and return an object containing the tile and its children as properties.
 * @param tile {Element} The tile (parent) element
 * @returns {{tile: Element, amount: Element, top: Element, center: Element, bottom: Element}}
 */
IncrementingTile.queryElements = (tile) => {

    return {
        tile: tile,
        amount: tile.querySelector(".inc-tile-amount"),
        top: tile.querySelector(".inc-tile-top"),
        center: tile.querySelector(".inc-tile-center"),
        bottom: tile.querySelector(".inc-tile-bottom"),
    }
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
    static: false, // No incrementation
    interval: 500, // Interval use to refresh the number
    speed: 5, // Amount used to reach the full amount faster
    cssClass: "", // CSS class to add to the root tile element for custom styling
    top: "", // Text/HTML to inject into the top element
    center: "", // Text/HTML to inject into the center element
    bottom: "" // Text/HTML to inject into the bottom element
};