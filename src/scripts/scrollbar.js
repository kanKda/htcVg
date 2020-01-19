function initScrollbar() {
    const scrollContainer = document.getElementById('scrollContainer');
    const thumb = document.getElementById('scrollThumb');
    const containerSize = document.getElementById('friends').offsetHeight;
    const hiddenZone = scrollContainer.offsetHeight - containerSize;
    const scrollbar = document.getElementById('scrollbar');
    let initFlag = hiddenZone > 0 ? 1 : 0;

    if (initFlag) {
        thumb.style.height = `${scrollbar.offsetHeight - hiddenZone}px`;
        scrollbar.style.visibility = 'visible';
    }

    const max = Math.round(hiddenZone / 10) * 10;
    let transformCounter = 0;
    let zoneCounter = 0;
    function scroll(ctx, unit) {
        if (!ctx && zoneCounter < max) {
            transformCounter -= unit;
            zoneCounter += unit;
            scrollContainer.style.transform = `translateY(${transformCounter}px)`;
            thumb.style.top = `${zoneCounter}px`;
        } else if (ctx && zoneCounter > 0) {
            transformCounter += unit;
            zoneCounter -= unit;
            scrollContainer.style.transform = `translateY(${transformCounter}px)`;
            thumb.style.top = `${zoneCounter}px`;
        }
    }

    scrollContainer.addEventListener('mouseover', function() {
        scrollContainer.onwheel = function(event) {
            const ctx = event.deltaY < 0 ? 1 : 0;
            scroll(ctx, 10);
        }
    })

    thumb.addEventListener('mousedown', function(event) {
        event.target.classList.add('scrollbarThumb-active');
        let tmpY = event.clientY;
        document.onselectstart = () => false;
        document.onmousemove = function(event) {
            if (event.clientY >= tmpY + 10) {
                scroll(0, 10);
                tmpY += 10;
            } else if (event.clientY <= tmpY - 10) {
                scroll(1, 10);
                tmpY -= 10;
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