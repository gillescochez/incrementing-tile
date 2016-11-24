(function() {

    let target = document.getElementById("tiles");

    new IncrementingTile({
        top: "Money wasted",
        center: "£ ",
        bottom: "What a shame",
        amountPerSecond: 0.45
    }, target);

})();