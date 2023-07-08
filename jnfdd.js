

"use strict";

const body = document.body;
const bgColorsBody = ["#444444", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

function clickItem(item, index) {

    menu.style.removeProperty("--timeOut");

    if (activeItem == item) return;

    if (activeItem) {
        activeItem.classList.remove("active");
    }


    item.classList.add("active");
    body.style.backgroundColor = bgColorsBody[index];
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder);


}

function offsetMenuBorder(element, menuBorder) {

    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {

    item.addEventListener("click", () => clickItem(item, index));

})

window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});








startImageTransition();

function startImageTransition() {

    // images stores list of all images of
    // class test. This is the list of images
    // that we are going to iterate
    var images = document.getElementsByClassName("test");

    // Set opacity of all images to 1
    for (var i = 0; i < images.length; ++i) {
        images[i].style.opacity = 1;
    }

    // Top stores the z-index of top most image
    var top = 1;

    // cur stores the index of the image currently
    // on top images list contain images in the
    // same order they appear in HTML code
    /* The tag with class test which appears last
       will appear on top of all the images thus,
       cur is set to last index of images list*/
    var cur = images.length - 1;

    // Call changeImage function every 3 second
    // changeImage function changes the image
    setInterval(changeImage, 2000);

    // Function to transitions from one image to other
    async function changeImage() {

        // Stores index of next image
        var nextImage = (1 + cur) % images.length;

        // First set the z-index of current image to top+1
        // then set the z-index of nextImage to top
        /* Doing this make sure that the image below
           the current image is nextImage*/
        // if this is not done then during transition
        // we might see some other image appearing
        // when we change opacity of the current image
        images[cur].style.zIndex = top + 1;
        images[nextImage].style.zIndex = top;

        // await is used to make sure
        // the program waits till transition()
        // is completed
        // before executing the next line of code
        await transition();

        // Now, the transition function is completed
        // thus, we can say that the opacity of the
        // current image is now 0

        // Set the z-index of current image to top
        images[cur].style.zIndex = top;

        // Set the z-index of nextImage to top+1
        images[nextImage].style.zIndex = top + 1;

        // Increment top
        top = top + 1;

        // Change opacity of current image back to 1
        // since zIndex of current is less than zIndex
        // of nextImage
        /* changing it's opacity back to 1 will not
           make the image appear again*/
        images[cur].style.opacity = 1;

        // Set cur to nextImage
        cur = nextImage;
    }

    /* This function changes the opacity of
    current image at regular intervals*/
    function transition() {
        return new Promise(function (resolve, reject) {

            // del is the value by which opacity is
            // decreased every interval
            var del = 0.001;

            // id stores ID of setInterval
            // this ID will be used later
            // to clear/stop setInterval
            // after we are done changing opacity
            var id = setInterval(changeOpacity, 100);

            // changeOpacity() decreasing opacity of
            // current image by del
            // when opacity reaches to 0, we stops/clears
            // the setInterval and resolve the function
            function changeOpacity() {
                images[cur].style.opacity -= del;
                if (images[cur].style.opacity <= 0) {
                    clearInterval(id);
                    resolve();
                }
            }
        })
    }
}