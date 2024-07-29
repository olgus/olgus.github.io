var currentProject = -1;
var helpElementsAreHidden = false;

function addEventListeners() {
    window.addEventListener('scroll', () => { 
        var scrollValue = window.scrollY / (document.body.offsetHeight - window.innerHeight);
        updateDocumentScrollValue(scrollValue);
        checkProjectDescription(scrollValue);
    }, false);
    updateScroll(0);
    checkProjectDescription(scrollValue);
}

function showProjectDescription(projectNumber){
    setProjectDescription(projectNumber);
    calcNewScrollPosition(projectNumber);
}

function setProjectDescription(projectNumber){
    if (currentProject != projectNumber)
    {
        var showProjectDescriptionText = '';
        switch(projectNumber)
        {
            case 0:
                showProjectDescriptionText = 'Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit Lorem ipsum dolor sit amet';
                break;
            case 1:
                showProjectDescriptionText = 'project 1';
                break;
            case 2:
                showProjectDescriptionText = 'project 2';
                break;
        }

        var textOnScreenElement = document.getElementById('text-on-screen');

        textOnScreenElement.innerText = showProjectDescriptionText;
        textOnScreenElement.style.setProperty('--textLength', showProjectDescriptionText.length);
        textOnScreenElement.style.animation = 'none';
        textOnScreenElement.offsetHeight;
        textOnScreenElement.style.animation = null; 

        currentProject = projectNumber;
    }
}

function updateScroll(position){
    window.scrollTo(0, position  * (document.body.offsetHeight - window.innerHeight));
    updateDocumentScrollValue(position);
}

function checkProjectDescription(scrollValue){
    var dif = 0.1;
    var a = (scrollValue * 3);
    var quot = ~~a;
    var b = quot / 3;
    var r = 3 * (scrollValue - b);
    if (r > 0.5 - dif && r < 0.5 + dif){
        setProjectDescription(quot);
    }
    setBlinkAnimation(r);
}

function setBlinkAnimation(r){
    var dif = 0.15;
    var cdRomBlinkElement = document.getElementById('cd-rom-blink-on-insert');
    if (r > 0.5 - dif && r < 0.5 + dif){
        cdRomBlinkElement.style.animation = null;
        cdRomBlinkElement.style.setProperty('opacity', 1);
    }
    else{
        cdRomBlinkElement.style.animation = 'none';
        cdRomBlinkElement.style.setProperty('opacity', 0);
    }
}

function calcNewScrollPosition(projectNumber){
    var position = projectNumber / 3 - 1 / 6;
    updateScroll(position);
}

function updateDocumentScrollValue(scrollValue){
    document.body.style.setProperty('--scroll', scrollValue);

    if (scrollValue > 0.1)
    {
        hideHelpElements();
    }
}

function hideHelpElements(){
    if (!helpElementsAreHidden)
    {
        var arrowElement = document.getElementById('arrow-help');
        arrowElement.style.setProperty('opacity', 0);
    }

    helpElementsAreHidden = true;
}