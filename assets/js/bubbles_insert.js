function popBubble(bubbleNumber) {
    let bubblePopElement = document.getElementById("bubble-pop-id-".concat(bubbleNumber));
    let bubbleGrowElement = document.getElementById("bubble-grow-id-".concat(bubbleNumber));

    runAnimation(bubblePopElement, "bubble-pop-animation", true);
    runAnimation(bubbleGrowElement, "bubble-grow-animation", true);
    
    unlockAchievement("bubble-pop");
}