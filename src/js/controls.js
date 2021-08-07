let isShiftDown = false;

function onKeyDown(event) {
    if (document.activeElement.tagName === "INPUT")
        return;

    if (isShiftDown) {
        return;
    }

    // noinspection CommaExpressionJS
    switch (event.key) {
        case "Shift":
            isShiftDown = true;
            break;

        case "ArrowUp":
            event.preventDefault();
            navigate(true);
            break;

        case "ArrowLeft":
            event.preventDefault();
            jumpSlidesRelative(-1);
            break;

        case " ":
        case "ArrowDown":
            event.preventDefault();
            navigate(false);
            break;

        case "ArrowRight":
            event.preventDefault();
            jumpSlidesRelative(1);
            break;

        case "0":
        case "Home":
            event.preventDefault();
            jumpToSlide(0);
            break;

        case "1":
            event.preventDefault();
            jumpToSlide(1);
            break;

        case "9":
        case "End":
            event.preventDefault();
            jumpToSlide(SLIDE_COUNT - 1);
            break;

        case "r": // reset timer
            event.preventDefault();
            timerStart = Date.now();
            updateTimers();
            break;

        case "d": // debug
            event.preventDefault();
            for (let revealable of document.querySelectorAll("[data-reveal]")) {
                revealable.style.opacity = revealable.style.opacity !== "0.33" ? "0.33" : "1";
                // console.log(revealable);
            }
            break;
    }
}

function onKeyUp(event) {
    if (event.key === "Shift") {
        isShiftDown = false;
    }
}

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function turbo(button, count, millis) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            button.onclick();
        }, i * millis);
    }
}
