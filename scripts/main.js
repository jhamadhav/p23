let bg = document.getElementById("bg-back")
let mount = document.getElementById("bg-mount")
let tree = document.getElementById("bg-tree")

window.onscroll = () => {
    let val = -1 * window.scrollY
    // console.log(val);
    bg.style.marginBottom = val * 0.25 + "px"
    mount.style.marginBottom = val * 0.4 + "px"
    tree.style.marginBottom = val * 0.5 + "px"
}