
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