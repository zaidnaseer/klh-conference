// Not using this js file
const el = document.getElementById("circle")
var curOverflow = el.style.overflow;

if ( !curOverflow || curOverflow === "visible" )
    el.style.overflow = "hidden";

var isOverflowing = el.clientWidth < el.scrollWidth 
    || el.clientHeight < el.scrollHeight;

el.style.overflow = curOverflow;

if (isOverflowing){
    console.log("Placing the circle in the middle of the image as the text is overflowing.");
}

