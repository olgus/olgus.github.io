function dropSugarCube() {
    let sugarCubeElement = document.getElementById("sugar-cube-id");
    let coffeeCupElement = document.getElementById("coffee-cup-id");

    runAnimation(sugarCubeElement, "drop-sugar-cube-animation", true);
    runAnimation(coffeeCupElement, "coffee-cup-stir-animation", true);

    unlockAchievement("sugar-cube");
}