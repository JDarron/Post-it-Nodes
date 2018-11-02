$(document).ready(function () {

    window.onscroll = function () { scrollFunc() };

    const btn = document.getElementById("scroll-btn");
    const btnTop = btn.offsetTop;

    const applyStickyClassToBtn = () => {
        if (window.pageYOffset > btnTop) {
            btn.classList.add("sticky");
        } else {
            btn.classList.remove("sticky");
        }
    };

    function scrollFunc() {
        applyStickyClassToBtn();
    };
});