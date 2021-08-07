function setCommentsHidden(hidden) {
    if (hidden) for (let element of document.querySelectorAll("[data-type=comment]")) {
        element.setAttribute("hidden", "hidden");
    }
    else for (let element of document.querySelectorAll("[data-type=comment]")) {
        element.removeAttribute("hidden");
    }
}

if (HIDE_COMMENTS)
    setCommentsHidden(true);

let timers = document.querySelectorAll("[data-type=timer]");
//console.log(timers);

timerStart = Date.now();

function updateTimers() {
    let date = new Date(Date.now() - timerStart);
    for (let t of timers) {
        while (t.firstChild)
            t.removeChild(t.firstChild);
        t.append(date.getUTCMinutes().toString().padStart(2, "0") + ":" +
            date.getUTCSeconds().toString().padStart(2, "0"));
    }
}

updateTimers();
setInterval(updateTimers, 1000);
