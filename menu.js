const menu = {
    container: document.getElementById('menu'),
    nav: document.getElementsByTagName('nav')[0],
    instructions: document.getElementById('instructions'),
    credits: document.getElementById('credits')
}

function menuListeners() {
    document.getElementById('playButton').addEventListener('click', () => {
        initiate();
        menu.nav.style.display = 'none';
        document.getElementById('bolide').style.display = 'none';
    });
    document.getElementById('instructionsButton').addEventListener('click', () => {
        menu.nav.style.display = 'none';
        menu.instructions.style.display = 'inline-block';
    });
    document.getElementById('instruBack').addEventListener('click', () => {
        menu.nav.style.display = 'flex';
        menu.instructions.style.display = 'none';
    });
    document.getElementById('creditsButton').addEventListener('click', () => {
        menu.nav.style.display = 'none';
        menu.credits.style.display = 'flex';
    })
    document.getElementById('creditBack').addEventListener('click', () => {
        menu.nav.style.display = 'flex';
        menu.credits.style.display = 'none';
    });
}

addEventListener('load', menuListeners);