function popBubble(bubbleNumber) {
    let bubblePopElement = document.getElementById("bubble-pop-id-".concat(bubbleNumber));

    runAnimation(bubblePopElement, "bubble-pop-animation");
    
    unlockAchievement("bubble-pop");
}

function startBubblesAnimation() {
    for (let i = 0; i < 5; i++) { 
        let bubbleElement = document.getElementById("bubble-block-id-".concat(i));
        if (bubbleElement != null) {
            bubbleElement.style.top = (90 + i * 3).toString().concat("%");
            let animationDelayInMs = Math.floor(Math.random() * (3000 + 3000 * i));

            setTimeout(() => {
                runAnimation(bubbleElement, "float-animation");
            }, animationDelayInMs);
        }
    }
}