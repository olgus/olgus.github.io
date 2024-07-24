var currentProject = -1;

function onLoad() {
    window.addEventListener('scroll', () => { 
        var scrollValue = window.scrollY / (document.body.offsetHeight - window.innerHeight);
        document.body.style.setProperty('--scroll', scrollValue);
    }, false);
}

function showProjectDescription(projectNumber) {
    if (currentProject != projectNumber)
    {
        var showProjectDescriptionText = '';
        switch(projectNumber)
        {
            case 0:
                showProjectDescriptionText = 'project 0 Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum dolor sit Lorem ipsum dolor sit amet rem ipsum dolor sit Lorem ipsum dolor sit amet rem ipsum dolor sit Lorem ipsum dolor sit amet rem ipsum dolor sit Lorem ipsum dolor sit amet';
                break;
            case 1:
                showProjectDescriptionText = 'project 1';
                break;
            case 2:
                showProjectDescriptionText = 'project 2';
                break;
            default:
                showProjectDescriptionText = '';
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