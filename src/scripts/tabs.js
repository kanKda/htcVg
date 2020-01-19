const container = document.getElementById('container');
const tabs = document.getElementById('tabs');

tabs.addEventListener('click', function(event) {
    const tmp = event.target;
    for (let i of container.children) {
        if (i.id !== tmp.dataset.container) {
            i.style.display = "none";
        } else {
            i.style = null;
        }
    }

    for (let j of this.children) {
        if (j !== tmp) {
            j.classList = "tab tab-off";
        } else {
            j.classList = "tab tab-on";
        }
    }
})