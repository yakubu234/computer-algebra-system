function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    alert('we are here')

    // document.querySelector('.Messages_list').innerHTML += '<div class="msg user" style="margin-bottom:30px;"><span class="avtr"><figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure></span><span class="responsText">' +
    //     msg + "<span class='chat-timestamp'><b>You</b> - Today " + time + "</span></span></div>";


}


// Accordion Function
$(function () {

    const accordionBtns = document.querySelectorAll(".accordion");

    accordionBtns.forEach((accordion, key) => {

        // open first three accordion and the last accordion by default
        if (key < 3 || key == (accordionBtns.length - 1)) {
            accordion.classList.toggle("is-open");
            let content = accordion.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }

        //when accordion button is cliked calc the height
        accordion.onclick = function () {
            this.classList.toggle("is-open");

            let content = this.nextElementSibling;
            console.log(content);

            if (content.style.maxHeight) {
                //this is if the accordion is open
                content.style.maxHeight = null;
            } else {
                //if the accordion is currently closed
                content.style.maxHeight = content.scrollHeight + "px";
            }
        };
    });

});



