function onLoad( ) {
    calcBanner();
}

function calcBanner() {
    let div = document.getElementById('movie-tape-id');
    headerWidth = window.getComputedStyle(div).getPropertyValue('width');

    let slide = document.getElementById('slide-id').animate([
    { right: '0px' },
    { right: headerWidth }
    ], {
    duration: 70000,
    iterations: Infinity
    });
}