class IncrementingTile {

    /**
     * Initialize new instance with provided settings and targeted element if any. Tile will be injected in the body
     * of the document if no target is provided.
     *
     * @param settings {Object} Configuration for the tile
     * @param [target] {HTMLElement} Parent element to inject tile into.
     */
    constructor(settings, target) {

        this.settings = settings || IncrementingTile.defaults;
        this.target = target || document.body;
        this.tile = null;

        this.generate();
        this.tick();
    }

    /**
     * Generate the tile interface based on provided settings
     */
    generate() {

        let template = `<div class="inc-tile">
            <div class="inc-tile-top"></div>
            <div class="inc-tile-center"></div>
            <div class="inc-tile-bottom"></div>
        </div>`;

        let wrap = document.createElement("div");
        wrap.innerHTML = template;

        this.tile = wrap.firstChild;

        this.target.appendChild(this.tile);
    }

    /**
     * Start the timer that take care of the number incrementation
     */
    tick() {

    }
}

IncrementingTile.defaults = {
    formatting: "thousands", // thousands / millions / none
    value: 1000,
    delay: 500
};