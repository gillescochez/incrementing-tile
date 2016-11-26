(function() {

    let target = document.getElementById("tiles");

    new IncrementingTile({
        top: "Money wasted",
        centerPrefix: "£",
        bottom: "What a shame"
    }, target);

})();