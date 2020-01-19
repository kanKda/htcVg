import './style/main.scss';
import './scripts/tabs';
import { initScrollbar } from './scripts/scrollbar';
import './scripts/profileChange';

setTimeout(() => initScrollbar()); //Костыль для совместимости с firefox

const infoMap = new Object();

function update() {
    const profileInfo = document.getElementById('profileInfo').children;
    function parseInfo(target) {
        for (let i = 0; i < target.length; i += 1) {
            if (target[i].children) parseInfo(target[i].children);
            if (target[i].dataset.info) {
                infoMap[target[i].dataset.info] = target[i].innerHTML;
            }
        }
    }
    parseInfo(profileInfo);
    localStorage.setItem('profileCache', JSON.stringify(infoMap));
}

function restore() {
    let cache = JSON.parse(localStorage.getItem('profileCache'));
    for (let i in cache) {
        document.querySelector(`[data-info="${i}"]`).innerHTML = cache[i];
    }
}

if (localStorage.getItem('profileCache')) {
    restore();
} else {
    update();
}

update();

export { update }