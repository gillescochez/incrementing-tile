(function() {

    let target = document.getElementById("tiles");

    new IncrementingTile({
        amountAtStart: 5000,
        top: "Money wasted",
        centerPrefix: "£",
        bottom: "What a shame"
    }, target);

})();