window.onload = function() {
    var logo = document.querySelector("#logo"),
        bg = document.querySelector(".container .bg"),
        taglines = document.querySelectorAll(".line span"),
        restartBtn = document.querySelector("#restartBtn"),
        tl = new TimelineLite();

    // Array.prototype.slice.call(taglines).forEach(function(line) {
    // })

    tl.staggerFrom(taglines, 1, {
        delay: 2,
        left: "-=30px",
        ease: Back.easeOut,
        scale: 1.8,
        alpha: 0
    }, 0.2).from(bg, 5, {
        backgroundPositionX: "+=10px",
        backgroundPositionX: "+=3px",
        ease: Back.easeOut,
        repeat: -1,
        yoyo: true
    });

    restartBtn.onclick = function() {
        tl.restart();
    };

    //show the demoBackground div after DOM is ready and all images loaded
    TweenLite.set(document.querySelector("#poem"), {
        css: {
            visibility: "visible"
        }
    });
};