function initScrollbar() {
    const scrollContainer = document.getElementById('scrollContainer');
    const thumb = document.getElementById('scrollThumb');
    const containerSize = document.getElementById('friends').offsetHeight;
    const hiddenZone = scrollContainer.offsetHeight - containerSize;
    const scrollbar = document.getElementById('scrollbar');
    let initFlag = hiddenZone > 0 ? 1 : 0;

    let thumbHeight;
    if (initFlag) {
        thumbHeight = (scrollbar.offsetHeight - 
            (scrollbar.offsetHeight / Math.round(hiddenZone / 10))) 
            / Math.round(hiddenZone / 10);
        thumbHeight = Math.round(thumbHeight);
        thumb.style.height = `${thumbHeight}px`;
        scrollbar.style.visibility = 'visible';
    }

    const max = Math.round(hiddenZone / 10) * 10;
    let thumbStep = (scrollbar.offsetHeight - thumbHeight) / (max / 10);
    let transformCounter = 0;
    let zoneCounter = 0;
    let iterCounter = 0;
    function scroll(ctx, unit) {
        if (!ctx && iterCounter < max) {
            iterCounter += 10;
            transformCounter -= 10;
            zoneCounter += unit;
            scrollContainer.style.transform = `translateY(${transformCounter}px)`;
            thumb.style.top = `${zoneCounter}px`;
        } else if (ctx && iterCounter > 0) {
            iterCounter -= 10;
            transformCounter += 10;
            zoneCounter -= unit;
            scrollContainer.style.transform = `translateY(${transformCounter}px)`;
            thumb.style.top = `${zoneCounter}px`;
        }
    }

    scrollContainer.addEventListener('mouseover', function() {
        scrollContainer.onwheel = function(event) {
            const ctx = event.deltaY < 0 ? 1 : 0;
            scroll(ctx, thumbStep);
        }
    })

    thumb.addEventListener('mousedown', function(event) {
        event.target.classList.add('scrollbarThumb-active');
        let tmpY = event.clientY;
        document.onselectstart = () => false;
        document.onmousemove = function(event) {
            if (event.clientY >= tmpY + thumbStep) {
                scroll(0, thumbStep);
                tmpY += thumbStep;
            } else if (event.clientY <= tmpY - thumbStep) {
                scroll(1, thumbStep);
                tmpY -= thumbStep;
            }
        }

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onselectstart = null;
            event.target.classList.remove('scrollbarThumb-active');
        }
    })

    scrollContainer.addEventListener('mouseout', function() {
        scrollContainer.onwheel = null;
    })

    for (let i of document.getElementById('container').children) {
        if (i.id !== 'profile') {
            i.style.display = 'none';
        }
    }
}

export { initScrollbar }