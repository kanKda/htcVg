import { update } from '../app'

const infoBlock = document.getElementById('profileInfo');

infoBlock.addEventListener('click', function(event) {
    if (!event.target.dataset.info) {
        if (event.target.id !== 'mailEdit') return;
    };
    let target;
    if (event.target.id == 'mailEdit') {
        target = event.target.parentNode.parentNode.children[0];
    } else {
        target = event.target;
    }
    changeInfo(target);
})

function changeInfo(element) {
    let input = document.createElement('input');
    const backupValue = element.innerHTML;
    input.type = 'text';
    input.placeholder = element.innerHTML;
    input.classList.add('profileInput');
    input.onblur = function() {
        element.innerHTML = input.value ? input.value : backupValue;
        input.parentNode.replaceChild(element, input);
        update();
    }
    setTimeout(() => input.focus());
    element.parentNode.replaceChild(input, element);
}

for (let i of document.getElementById('hobbyList').children) {
    if (!i.dataset.hobby) {
        i.onclick = function() {
            i.remove();
            update();
        }
    } else {
        i.onclick = function() {
            addHobby(i);
        }
    }
}

function addHobby(element) {
    setTimeout(() => input.focus());
    const input = document.createElement('input');
    input.classList.add("profileInput");
    const hobby = document.createElement('div');
    hobby.classList.add("profileHobbyItem");
    hobby.onclick = function() {
        hobby.remove();
        update();
    }
    const submit = document.createElement('button');
    submit.innerHTML = "Добавить";
    const parent = element.parentNode;
    parent.append(submit);
    parent.replaceChild(input, element);
    submit.onclick = function() {
        hobby.innerHTML = input.value;
        parent.prepend(hobby);
        parent.replaceChild(element, input);
        submit.remove();
        update();
    }
}