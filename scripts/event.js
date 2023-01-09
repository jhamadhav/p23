const showDetail = (i) => {
    document.getElementById("display-img").src = `./assets/images/event/${events[i]["image"]}`
    document.getElementById("display-title").innerText = events[i]["name"]
    document.getElementById("display-about").innerText = events[i]["about"]
    document.getElementById("display-date").innerText = `Date: ${events[i]["date"]}`
    document.getElementById("display-register").href = events[i]["link"]

    let carImg = document.getElementsByClassName("carousal-img")
    for (let j = 0; j < carImg.length; ++j) {
        carImg[j].style.transform = ""
    }
    carImg[i].style.transform = "translateY(-20%)"

}
const makeCarousal = () => {
    let carousalDiv = document.getElementsByClassName("carousal")[0]

    let imgs = "";
    for (let i = 0; i < events.length; ++i) {
        imgs += `<img class="carousal-img" src="./assets/images/event/${events[i]["image"]}" alt="${events[i]["name"]}-thumbnail">`
    }
    carousalDiv.innerHTML = imgs

    let carImg = document.getElementsByClassName("carousal-img")
    for (let i = 0; i < carImg.length; ++i) {
        carImg[i].addEventListener("click", () => {
            showDetail(i)
        })
        carImg[i].addEventListener("mouseover", () => {
            showDetail(i)
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
        cnt += `
        <div class="card">
            <a class="register" href="${events[i]["link"]}"> Register </a>
            <div class="card-details">
                <div class="event-title">${events[i]["name"]}</div>
                <div class="event-date"> Date: ">${events[i]["date"]}</div>
                <div class="event-about">">${events[i]["about"]}</div>
            </div>
        </div>
        `
    }

    cardHolder.innerHTML = cnt

    let cards = document.getElementsByClassName("card")
    for (let i = 0; i < events.length; ++i) {
        cards[i].style.background = `url("./../assets/images/event/${events[i]["image"]}")`
        cards[i].style.backgroundPosition = "center"

        cards[i].addEventListener("click", () => {
            showDetail(i)
        })
    }
}

window.onload = () => {
    makeCarousal()
    makeCards()
}