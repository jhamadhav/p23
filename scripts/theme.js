let frame2 = document.getElementById("frame2");
let frame3 = document.getElementById("frame3");
let frame4 = document.getElementById("frame4");
window.onscroll = () => {
  let val = -1 * window.scrollY;

  frame2.style.marginLeft = -600 + val * -0.5 + "px";
  frame3.style.marginLeft = -1000 + val * -0.5 + "px";
};
