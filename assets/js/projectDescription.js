var screenshotsGallery = "";
var screenshotsFiles = [];
var currentImageIndex = -1;
var hintHidden = false;

function onLoad( galleryJson ) {
    var screenshotGalleryJson = JSON.parse (galleryJson);

    screenshotsGallery = screenshotGalleryJson.folderName;
    screenshotsFiles = screenshotGalleryJson.fileNames;

    let cookie = getCookie("previewHint");
    if (cookie != "") {
        hideHint();
        let imagePreviewElement = document.getElementById("image-preview-id");
        showNextImage("right", imagePreviewElement);
    }
    else {
        showHint();
    }
}

function tamagochiButtonNextImageOnMouseDown (button, direction, preview) {
    tamagochiButtonOnMouseDown (button);

    if (preview) {
        let imagePreviewElement = document.getElementById("image-preview-id");
        showNextImage (direction, imagePreviewElement);
    }
    else {
        let imageGalleryElement = document.getElementById("image-id");
        showNextImage (direction, imageGalleryElement);
    }
}

function tamagochiButtonCloseUpOnMouseDown (button) {
    tamagochiButtonOnMouseDown (button);

    // hide scroll
    addStyle (document.body, "scroll-off");
    
    // show overlay
    let overlayElement = document.getElementById("overlay-id");
    addStyle (overlayElement, "display-flex");

    // set image
    let imageElement = document.getElementById("image-id");
    setImage (imageElement);
}

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

function hideHint () {
    if( !hintHidden ){
        let galleryHintElement = document.getElementById("preview-gallery-hint-id");
        galleryHintElement.style.setProperty("display", "none");
        hintHidden = true;

        let cookie = getCookie("previewHint");
        if (cookie == "") {
            setCookie("previewHint", "hidden");
        }
    }
}

function showHint () {
    let galleryHintElement = document.getElementById("preview-gallery-hint-id");
    galleryHintElement.style.setProperty("display", "block");
}

function showNextImage (direction, element) {
    hideHint();
    
    if (direction == "right") {
        currentImageIndex >= screenshotsFiles.length - 1 ? currentImageIndex = 0 : currentImageIndex = currentImageIndex + 1;
    }
    else {
        currentImageIndex <= 0 ? currentImageIndex = screenshotsFiles.length - 1 : currentImageIndex = currentImageIndex - 1;
    }

    setImage (element);
}

function setImage(element) {
    var imageSrc = screenshotsGallery.concat ("//", screenshotsFiles[currentImageIndex]);
    element.src = imageSrc;
}

function hideGallery (){
    // hide overlay
    let overlayElement = document.getElementById("overlay-id");
    removeStyle (overlayElement, "display-flex");
    
    // show scroll
    removeStyle (document.body, "scroll-off");

    // update preview image
    let imageElement = document.getElementById("image-preview-id");
    setImage (imageElement);
}

function dropSugarCube() {
    let sugarCubeElement = document.getElementById("sugar-cube-id");
    let coffeeCupElement = document.getElementById("coffee-cup-id");

    runAnimation(sugarCubeElement, "drop-sugar-cube-animation", true);
    runAnimation(coffeeCupElement, "coffee-cup-stir-animation", true);

    unlockAchievement("sugar-cube");
}

function runAnimation(element, animationName, withRemoval = false) {
    if (!element.classList.contains(animationName)){
        void element.offsetWidth;
        element.classList.add(animationName); 

        if (withRemoval){
            setTimeout(() => {
                element.classList.remove(animationName);
                void element.offsetWidth;
            }, getAnimationDuration(element));          
        }   
    }
}

function getAnimationDuration(element){
    let computedStyle = window.getComputedStyle(element);
    let animationDuration = computedStyle.animationDuration;        
    let animationDelay = computedStyle.animationDelay;   
    return convertSecondsStringToMilliseconds (animationDuration) + convertSecondsStringToMilliseconds (animationDelay);
}

function convertSecondsStringToMilliseconds (durationInSecondsString){
    let seconds = 0;
    let secondsLookUp = "[0-9]*.*[0-9]+[s]";
    const foundSeconds = durationInSecondsString.match(secondsLookUp);
    seconds = parseFloat(foundSeconds);

    return convertSecondsToMilliseconds (seconds);
}

function convertSecondsToMilliseconds (seconds){
    return seconds * 1000;
}

function addStyle (element, styleClassName) {
    if (!element.classList.contains (styleClassName)){
        element.classList.add (styleClassName);
        void element.offsetWidth;
    }
}

function removeStyle (element, styleClassName) {
    if (element.classList.contains (styleClassName)){
        element.classList.remove (styleClassName);
        void element.offsetWidth;
    }
}

function setCookie(cname, cvalue, exdays = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));

    let expires = "expires="+ date.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}