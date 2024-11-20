function tamagochiButtonOnMouseDown (button) {
    addStyle (button, "tamagochi-button-mouse-down");
    removeStyle (button, "tamagochi-button-on-hover");
}

function tamagochiButtonOnMouseUp (button) {
    removeStyle (button, "tamagochi-button-mouse-down");
    addStyle (button, "tamagochi-button-on-hover");
}

function tamagochiButtonOnMouseEnter (button) {
    addStyle (button, "tamagochi-button-on-hover");
}

function tamagochiButtonOnMouseLeave (button) {
    removeStyle (button, "tamagochi-button-on-hover");
}

function onLoad() {
}

function addStyle (element, styleClassName) {
    if (!element.classList.contains (styleClassName)){
        element.classList.add (styleClassName);
    }
}

function removeStyle (element, styleClassName) {
    if (element.classList.contains (styleClassName)){
        element.classList.remove (styleClassName);
    }
}