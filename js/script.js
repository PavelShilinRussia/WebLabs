
(function() {
    window.addEventListener('load', function() {
        const startTime = window.performance.timing.navigationStart;
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        const footerText = document.querySelector('.footer__text');
        footerText.innerHTML += `<br>Page load time: ${loadTime}ms`;
    });
})();

window.addEventListener('load', function() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu__link');
    menuLinks.forEach(function(link) {
        const linkUrl = new URL(link.getAttribute('href'), window.location.href).pathname;
        if (linkUrl === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});