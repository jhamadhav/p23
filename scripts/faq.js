let qs = document.getElementsByClassName("faq-qs")
for (let i = 0; i < qs.length; ++i) {
    qs[i].onclick = () => {
        let ans = document.getElementsByClassName("faq-ans")
        let temp = (ans[i].style.display != "block")
        ans[i].style.display = (temp) ? "block" : "none"
    }
}