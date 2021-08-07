function getSlideNumber(element = null) {
    if (element === null) {
        let hash = location.hash;
        if (hash === "")
            return 0;
        let id = hash.substring(1);
        element = document.getElementById(id);
    }

    try {
        // id = "slide-xxx" or some other element
        // go up the hierarchy until slide is found
        while (!element.id.match("slide-[0-9]+")) {
            element = element.parentElement;
            if (element == null)
                return 0;
        }

        return parseInt(element.id.substring(6));
    } catch (e) {
        return 0;
    }
}

function jumpToSlide(num) {
    let id = "slide-" + num;
    let slide = document.getElementById(id);
    if (slide != null)
        location.hash = "#" + id;

    currentReveals = reveals[num];
    for (let vid of slide.querySelectorAll("[data-type=slide-video]"))
        vid.play();
}

function jumpSlidesRelative(count) {
    let num = getSlideNumber();
    jumpToSlide(Math.max(0, Math.min(SLIDE_COUNT - 1, num + count)));
}

function navigate(backwards = false) {
    if (backwards)
        jumpSlidesRelative(-1);
    else if (currentReveals.length !== 0) {
        let revealed = currentReveals.shift();
        revealed.style.visibility = "visible";
    } else {
        jumpSlidesRelative(1);
    }
}

function onHashChange(event) {

    let targetId = event.newURL.substring(event.newURL.indexOf("#") + 1);
    if (!targetId.match("slide-[0-9]+")) {
        event.preventDefault();
        let target = document.getElementById(targetId);
        jumpToSlide(getSlideNumber(target));
        //console.log(targetId);
    }
}

window.addEventListener("hashchange", onHashChange, false);
