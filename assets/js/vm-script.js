var currentProject = -1;
var coinIsInserted = false;
var newPageIsLoading = false;
var currentHint = 0;
var hintsIds = [
    "project-hint-id",
    "coin-hint-id",
    "handle-hint-id",
    "links-hint-id",
    "help-hint-id",
];
var collectedAchievements = {
    "cat-tail" : false,
    "sugar-cube" : false,
    "bubble-pop" : false,
};

function onLoad() {
    let cookie = getCookie("hints");
    if (cookie == "") {
        setCookie("hints", "seen");

        let hints = document.getElementById("hints");
        hints.style.setProperty("display", "flex");
    }
    else {
        onHintsHidden();
    }

    // read achievements from cookie
    for (const [key, value] of Object.entries(collectedAchievements)) {
        let achivementCookie = getCookie(key);
        if (achivementCookie != ""){
            collectedAchievements[key] = (achivementCookie == "true");
        }
    }      
    updateAchievements();
}

function insertCoin() {
    if (!coinIsInserted){
        let element = document.getElementById("coin");

        runAnimation(element, "coin-animation");

        let highlightElement = document.getElementById("coin-highlight" );
        highlightElement.style.setProperty("visibility", "hidden");

        coinIsInserted = true;
        updateCurrentProjectDescription();
    }
}

function moveCatTail() {
    let catTailElement = document.getElementById("cat-tail-id");
    let catTailReflectionElement = document.getElementById("cat-tail-reflection-id");
   
    runAnimation(catTailElement, "cat-tail-move", true);
    runAnimation(catTailReflectionElement, "cat-tail-move", true);

    unlockAchievement("cat-tail");
}

function dropSugarCube() {
    let sugarCubeElement = document.getElementById("sugar-cube-id");
    let coffeeCupElement = document.getElementById("coffee-cup-id");

    runAnimation(sugarCubeElement, "drop-sugar-cube-animation", true);
    runAnimation(coffeeCupElement, "coffee-cup-stir-animation", true);

    unlockAchievement("sugar-cube");
}

function popBubble(bubbleNumber) {
    let bubblePopElement = document.getElementById("bubble-pop-id-".concat(bubbleNumber));
    let bubbleGrowElement = document.getElementById("bubble-grow-id-".concat(bubbleNumber));

    runAnimation(bubblePopElement, "bubble-pop-animation", true);
    runAnimation(bubbleGrowElement, "bubble-grow-animation", true);
    
    unlockAchievement("bubble-pop");
}

function unlockAchievement(achievementKey) {
    if (!collectedAchievements[achievementKey]) {
        collectedAchievements[achievementKey] = true;

        // show animation of adding achievement
        // update icon
        markAchievementAsCompleted(achievementKey);

        // update cookie
        setCookie(achievementKey, "true");
    }
}

function updateAchievements() {
    for (const [key, value] of Object.entries(collectedAchievements)) {
        if (value) {
            markAchievementAsCompleted(key);
        }
    }
}

function markAchievementAsCompleted(achievementKey) {
    let elementId = achievementKey;
    elementId = elementId.concat("-achievement-icon-id");
    let achievementIconElement = document.getElementById(elementId);
    if (achievementIconElement) {
        achievementIconElement.style.backgroundColor = "rgb(0, 255, 0)";
    }
}

function showHints() {
    if (!newPageIsLoading) {
        let linksHintElement = document.getElementById("links-hint-id-highlight");
        linksHintElement.style.animation = "none";
        linksHintElement.offsetHeight;

        let hints = document.getElementById("hints");
        hints.style.setProperty("display", "flex");

        hintsIds.forEach(hint => {
            showHint(hint);
        });
        
        let nextActionText = document.getElementById("continue-label-id");
        nextActionText.textContent = "Click anywhere to hide hints";
    }
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

function updateHintsOnClick() {
    currentHint = currentHint + 1;
    if (currentHint < hintsIds.length){
        showHint(hintsIds[currentHint]);
        
        if (currentHint + 1 == hintsIds.length){
            let nextActionText = document.getElementById("continue-label-id");
            nextActionText.textContent = "Click anywhere to hide hints";
        }
    }
    else{
        let hints = document.getElementById("hints");
        hints.style.setProperty("display", "none");
        onHintsHidden();
    }
}

function showHint(hintId) {
    let hintToShow = document.getElementById(hintId);
    hintToShow.style.setProperty("opacity", "100%");

    let highlightToShow = document.getElementById(hintId.concat("-highlight"));
    highlightToShow.style.setProperty("opacity", "100%");
}

function onHintsHidden() {
    currentHint = hintsIds.length;
    startPetalsAnimation();
}

function showProjectDescription(projectNumber) {
    if (currentProject != projectNumber){
        currentProject = projectNumber;
        updateCurrentProjectDescription();
    }
}

function updateCurrentProjectDescription(){
    var showProjectDescriptionText = "";
    if (coinIsInserted) {
        switch(currentProject){
            case 0:
                showProjectDescriptionText = "project 0 Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit Lorem ipsum dolor sit amet rem ipsum dolor sit Lorem ipsum dolor sit amet rem ipsum dolor sit Lorem ipsum dolor sit amet rem ipsum dolor sit Lorem ipsum dolor sit amet";
                break;
            case 1:
                showProjectDescriptionText = "project 1";
                break;
            case 2:
                showProjectDescriptionText = "project 2";
                break;
            default:
                showProjectDescriptionText = "Choose a project -->";
                break;
        }
    }
    else {
        var emptySpace = "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0";
        var smallEmptySpace = "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0";
        showProjectDescriptionText = "Please insert a coin".concat(smallEmptySpace, "|\n", emptySpace, "|\n", emptySpace, "v");
    }

    var textOnScreenElement = document.getElementById("text-on-screen");

    textOnScreenElement.innerText = showProjectDescriptionText;
    textOnScreenElement.style.setProperty("--textLength", showProjectDescriptionText.length);
    restartAnimation(textOnScreenElement);
}

function restartAnimation(element){
    element.style.animation = "none";
    element.offsetHeight;
    element.style.animation = null; 
}

function openProjectPage() {
    let pageName = "";

    if (coinIsInserted) {
        switch(currentProject) {
            case 0:
                pageName = "../productivityTimer";
                break;
            case 1:
                pageName = "../birthdayBot";
                break;
            default:
                break;
        }
    }

    if (pageName != "" && !newPageIsLoading) {
        newPageIsLoading = true;

        let overlay = document.getElementById("loading-overlay");
        overlay.style.setProperty("display", "flex");

        setTimeout(() => {
            window.open(pageName, "_self");
        }, 1000);
    }
}

function showAchievements() {
    let overlay = document.getElementById("achievements-overlay");
    overlay.style.setProperty("display", "flex");
}

function hideAchievements() {
    let overlay = document.getElementById("achievements-overlay");
    overlay.style.setProperty("display", "none");
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

function startPetalsAnimation(){
    startPetalAnimation(0);
    startPetalAnimation(1);
    startPetalAnimation(2);
}

function startPetalAnimation(id){
    let nextAnimationDelayInSec = Math.floor(Math.random() * (10 + id * 3));
    setTimeout(() => {
        let elementIdStartStr = "sakura-petal-";
        let elementId = elementIdStartStr.concat(id.toString(), "-id");
        let sakuraPetalElement = document.getElementById(elementId);

        restartAnimation(sakuraPetalElement);

        let fallAnimationDelayInMs = Math.floor(Math.random() * 1000);
        setTimeout(() => {
            sakuraPetalElement.style.setProperty("opacity", "100%");
        }, fallAnimationDelayInMs);

        setTimeout(() => {
            sakuraPetalElement.style.setProperty("opacity", "0%");
            startPetalAnimation(id);
        }, 5000
        );
    }, convertSecondsToMilliseconds(nextAnimationDelayInSec));
}