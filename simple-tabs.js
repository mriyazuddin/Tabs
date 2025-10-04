let tabButtons = [];
let tabMap = null;
let activeButton = 'btn1';

document.addEventListener('DOMContentLoaded', initTabs);

function initTabs () {
    tabButtons = Array.from(document.querySelectorAll('#btn-container > .tab-button'));

    tabMap = new Map();
    tabButtons.forEach((tabButton) => {
        const panelID = tabButton.dataset.target;

        if (panelID) tabMap.set(tabButton, panelID);
    });

    document
    .querySelector('#tab-container')
    .addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-button');

        if (!btn) return;
        showTabContent(btn);
    });

    document
    .querySelector('#tab-container')
    .addEventListener('keydown', (e) => {
        const btn = e.target.closest('.tab-button');

        if (!btn) return;
        tabNavigation(btn, e);
    });
}

function showTabContent(targetButton) {
    const targetPanelID = tabMap.get(targetButton);
    const targetPanel = document.getElementById(targetPanelID);

//Loop through tab buttons to apply relevant styles to the active and inactive buttons
    for (let i = 0; i < tabButtons.length; i++) {
        if (tabButtons[i] == targetButton) {
            tabButtons[i].focus();
            tabButtons[i].classList.remove('btn-inactive');
            tabButtons[i].classList.add('btn-active');
            tabButtons[i].setAttribute('aria-selected', 'true');
            tabButtons[i].setAttribute('tabindex', 0);
        } else {
            tabButtons[i].classList.remove('btn-active');
            tabButtons[i].classList.add('btn-inactive');
            tabButtons[i].setAttribute('aria-selected', 'false');
            tabButtons[i].setAttribute('tabindex', -1);
        }
    }

//Loop through tabMap to ensure the correct panel is displayed while others get hidden
    for (const [button, panel] of tabMap) {
        const p = document.getElementById(panel);
        if(targetPanel == p) {
            p.classList.remove('inactive-panel');
            p.classList.add('active-panel');
            p.setAttribute('tabindex', '0');
            p.removeAttribute('inert');
        }
        else {
            p.classList.remove('active-panel');
            p.classList.add('inactive-panel');
            p.setAttribute('tabindex', '-1');
            p.setAttribute('inert', '');
        }
    }
}
function tabNavigation(btn, e) {
    let index = tabButtons.indexOf(btn);
    let buttonsCount = tabButtons.length;

    if (index < 0 || buttonsCount == 0) return;

    if (e.key == 'ArrowRight') {
        if (index <= buttonsCount - 2) {
            e.preventDefault();
            tabButtons[index + 1].focus();
            showTabContent(tabButtons[index + 1]);
        } else if (index == buttonsCount - 1){
            e.preventDefault();
            tabButtons[0].focus();
            showTabContent(tabButtons[0]);
        }
    } else if (e.key == 'ArrowLeft') {
        if (index > 0) {
            e.preventDefault();
            tabButtons[index - 1].focus();
            showTabContent(tabButtons[index - 1]);
        } else if (index == 0){
            e.preventDefault();
            tabButtons[buttonsCount - 1].focus();
            showTabContent(tabButtons[buttonsCount - 1]);
        }
    } else if (e.key == 'Home') {
        e.preventDefault();
        tabButtons[0].focus();
        showTabContent(tabButtons[0]);
    } else if (e.key == 'End') {
        e.preventDefault();
        tabButtons[buttonsCount - 1].focus();
        showTabContent(tabButtons[buttonsCount - 1]);
    } else if (e.key == 'Spacebar' || e.key == ' ' || e.key == 'Space' || e.key == 'Enter') {
        e.preventDefault();
        tabButtons[index].focus();
        showTabContent(tabButtons[index]);
    }
}
