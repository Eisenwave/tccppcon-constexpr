/** Amount of slides. */
let SLIDE_COUNT = 0;
/** Reveal-effects of each slide. */
let reveals = {};
/** Revealable elements on the current slide. */
let currentReveals = null;

{ // HTML preprocess
    const SLIDE_HEADER_CONTAINER = document.getElementById("slide-header-container");
    const SLIDE_HEADER_SEPARATOR = document.getElementById("slide-header-separator");
    const SLIDE_HEADER_RIGHT = document.getElementById("slide-header-right");

    for (let slide of document.querySelectorAll("*")) {
        if (slide.tagName !== "SECTION") continue;
        let index = SLIDE_COUNT;
        slide.id = "slide-" + index;

        SLIDE_COUNT++;

        headerPreProcess: {
            let child = slide.querySelector("[data-type=slide-header]");
            if (child === null) break headerPreProcess;
            child.className = "slide-header";

            let containerInstance = SLIDE_HEADER_CONTAINER.cloneNode(true);
            let separatorInstance = SLIDE_HEADER_SEPARATOR.cloneNode(true);
            let rightInstance = SLIDE_HEADER_RIGHT.cloneNode(true);

            //slideHeaderInstance.setAttribute("hidden", "");
            slide.prepend(separatorInstance);
            slide.prepend(containerInstance);
            containerInstance.appendChild(child);
            containerInstance.appendChild(rightInstance);


            containerInstance.id = "slide-header-" + index;
            separatorInstance.id = "slide-header-separator-" + index;
            rightInstance.id = "slide-header-right-" + index;

            for (let element of slide.querySelectorAll("[data-type=slide-num]"))
                element.append(index.toString().padStart(2, "0"));
        }

        // noinspection UnnecessaryLabelJS
        revealEffects: {
            reveals[index] = [];
            for (let element of slide.querySelectorAll('[data-reveal]')) {
                reveals[index].push(element);
                element.style.visibility = "hidden";
            }
            if (reveals[index].length) {
                reveals[index].sort(function (a, b) {
                    let indexA = parseInt(a.getAttribute('data-reveal'));
                    let indexB = parseInt(b.getAttribute('data-reveal'));
                    return indexA - indexB;
                });
            }
        }
    }
    SLIDE_HEADER_CONTAINER.setAttribute("hidden", "hidden");
}
