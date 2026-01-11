(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function replace() {
        const replaceItems = document.querySelectorAll("[data-replace]");
        if (replaceItems.length && window.matchMedia("(max-width: 743px)").matches) replaceItems.forEach((item => {
            const nextString = item.dataset.replace;
            item.textContent = nextString;
        }));
    }
    isWebp();
    replace();
})();