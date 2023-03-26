function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;

    var spinner = document.getElementById('spinner')
    spinner.classList.toggle("spinner");


    input = document.getElementById('myInput');
    filter = input.value;
    data = {
        search_key: filter
    }

    data = JSON.stringify(data)

    var client = new HttpClientPost();
    client.get(location.origin + '/search', data, null, (response) => {
        var response = JSON.stringify(response)
        console.log(response)

        spinner.classList.toggle("spinner");


        if (response.errors) {
            d = response.errors
            Object.keys(d).forEach(key => {// console.log(key, d[key]);

            });
        }

        if (response.status == 'Error') {
            //show error if theres error message
        }

        if (response.status == 'Success') {

            response.message//display this message
            var data = response.data
            input.reset()
        }


    });

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



