let extraTime = 20 * 60 * 60 * 1000
const showDetail = (i) => {

    document.getElementById("display-img").src = `./assets/images/event/${events[i]["image"]}`
    document.getElementById("display-title").innerText = events[i]["name"]
    document.getElementById("display-about").innerText = events[i]["about"]
    document.getElementById("display-date").innerText = `Date: ${events[i]["date"]}`

    let tempLink = events[i]["link"]
    let ta = new Date(events[i]["time"])
    ta = ta.getTime() + extraTime
    if (Date.now() > ta) {
        tempLink = "https://www.instagram.com/rcoem.src/"
    }
    document.getElementById("display-register").href = tempLink

}

const compTime = (a, b) => {
    let ta = new Date(a["time"])
    ta = ta.getTime()

    let tb = new Date(b["time"])
    tb = tb.getTime()

    if (ta >= tb) {
        return 1;
    }
    if (ta < tb) {
        return -11;
    }
    return 0;
}
const makeCarousal = () => {
    let carousalDiv = document.getElementsByClassName("carousal")[0]

    let imgs = "";
    let arr = []
    for (let i = 0, count = 0; i < events.length && count < 5; ++i) {
        let ta = new Date(events[i]["time"])
        ta = ta.getTime() + extraTime
        if (Date.now() <= ta) {
            count++
        } else {
            continue
        }
        imgs += `<img class="carousal-img" src="./assets/images/event/${events[i]["image"]}" alt="${events[i]["name"]}-thumbnail">`
        arr.push(i)
    }
    carousalDiv.innerHTML = imgs

    let carImg = document.getElementsByClassName("carousal-img")
    for (let i = 0; i < carImg.length; ++i) {
        carImg[i].addEventListener("click", () => {
            showDetail(arr[i])
        })
        carImg[i].addEventListener("mouseover", () => {
            showDetail(arr[i])
        })
    }
}

/*
<div class="card">
    <button class="register"> Register </button>
    <div class="card-details">
        <div class="event-title">Event Name </div>
        <div class="event-date"> Date: DD-MM-YYYY </div>
        <div class="event-about"> </div>
    </div>
</div> */
const makeCards = () => {
    let cardHolder = document.getElementById("card-holder")

    let cnt = ""
    for (let i = 0; i < events.length; ++i) {
        let tempLink = events[i]["link"]
        let ta = new Date(events[i]["time"])
        ta = ta.getTime() + extraTime
        if (Date.now() > ta) {
            tempLink = "https://www.instagram.com/rcoem.src/"
        }
        cnt += `
        <div class="card">
            <a class="register" target="_blank" rel="noopener noreferrer" href="${tempLink}"> Register </a>
            <div class="card-details">
                <div class="event-title">${events[i]["name"]}</div>
                <div class="event-date"> Date: "${events[i]["date"]}</div>
                <div class="event-about">"${events[i]["about"]}"</div>
            </div>
        </div>
        `
    }

    cardHolder.innerHTML = cnt

    let cards = document.getElementsByClassName("card")
    for (let i = 0; i < events.length; ++i) {
        cards[i].style.background = `url("./../assets/images/event/${events[i]["image"]}")`
        cards[i].style.backgroundPosition = "center"
        cards[i].style.backgroundSize = "cover";

        cards[i].addEventListener("click", () => {
            showDetail(i)
        })
    }
}

window.onload = () => {
    events = events.sort(compTime)
    makeCarousal()
    makeCards()
}