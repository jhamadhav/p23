let qs = document.getElementsByClassName("faq-qs")
for (let i = 0; i < qs.length; ++i) {
    qs[i].onclick = () => {
        let ans = document.getElementsByClassName("faq-ans")
        if (ans[i].style.display == "none") {
            ans[i].style.display = "block"
        } else {
            ans[i].style.display = "none"
        }
    }
}