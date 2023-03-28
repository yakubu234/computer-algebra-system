function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;


    //clear any child element that has been added
    document.querySelector('.container-ull').clearContent();

    // the spinner when searh params are submitted
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
        console.log(response)

        spinner.classList.toggle("spinner");


        if (response.errors) {
            console.log('validation')
            d = response.errors
            Object.keys(d).forEach(key => {// console.log(key, d[key]);

            });
        }


        if (response.status == 'error') {
            var message = response.message
            console.log('error')

            //show error if theres error message
        }

        if (response.status == 'success') {
            var data = response.data  //the data passed in the data field

            var html = "";
            const pattern = /^[`!@#$%^&*()[\]\s_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g;
            Object.entries(data).forEach(([key, value]) => {

                //first step
                var steps = key.replace(/_/g, " ");
                var changeType = data[key].change_type.replace(/_/g, " ");

                var key_1 = key.match(/\d+/)[0] // get the valid integer from the whole string
                var new_key_1 = key.split(key_1).join((key_1 - 1)) // replace the integer value to -1 of the initial

                // the open and close button
                html += '<button class="accordion" onclick="accordion()"  >';
                html += "<span style='color:red;'>" + steps + "</span> : " + changeType + '</button>';


                //the contents opening div
                html += '<div class="accordion-content"><p>';
                var question = (parseInt(key_1) === 1 ? filter : ((data[key].before_change.match(pattern)) ? data[key].before_change : data[new_key_1].after_change))


                html += '<p> `' + `${question}` + '` </p>';
                let sub_step = []

                // if (data[key].number_of_substeps > 0) {
                //     sub_step.push(data[key].indexOf('sub_step_') !== -1)

                // && /.*sub_step_.*/.test(data[key])
                // console.log(sub_step)
                //     Object.entries(sub_step).forEach(([key_1, value_1]) => {
                //         console.log(`${key_1}`)
                //         // console.log(`${key_1}: ${value_1}`)
                //         // console.log(sub_step[key][key_1])
                //     });

                // }

                // console.log(`${key}: ${value}`)
                // console.log(data[key])

                //peform the sub query stuff here


                html += '<p> `' + `${data[key].after_change}` + '` </p>';// answer

                html += ' </p></div>'; // the contents closing div
            });


            //append the dynamically generated html to the parent node
            document.querySelector('.container-ull').htmlContent(html);

            MathJax.typeset();

            html = ''; //set html to empty on the page

            accordion(); // performthe auto open and listings 

            var message = response.message

            input.value = ""
        }


    });

}

function lastArray(array) {
    var keys = Object.keys(array);
    return keys[keys.length - 1];
}

// append the dynamically generated html to the parent node
HTMLElement.prototype.htmlContent = function (html) {
    var dom = new DOMParser().parseFromString(html, 'text/html').body;
    while (dom.hasChildNodes()) this.appendChild(dom.firstChild);
}

// remove the dynamically generated html from the parent node
HTMLElement.prototype.clearContent = function () {
    while (this.hasChildNodes()) this.removeChild(this.lastChild);
}


// Accordion Function
function accordion() {

    const accordionBtns = document.querySelectorAll(".accordion");

    accordionBtns.forEach((accordion, key) => {

        // open first three accordion and the last accordion by default
        if (key < 3 || key == (accordionBtns.length - 1)) {
            accordion.classList.toggle("is-open");
            let content = accordion.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = (500 + content.scrollHeight) + "px";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }

        //when accordion button is cliked calc the height
        accordion.onclick = function () {
            this.classList.toggle("is-open");

            let content = this.nextElementSibling;
            // console.log(content);

            if (content.style.maxHeight) {
                //this is if the accordion is open
                content.style.maxHeight = (500 + content.scrollHeight) + "px";
            } else {
                //if the accordion is currently closed
                content.style.maxHeight = content.scrollHeight + "px";
            }

            var objDiv = content
            objDiv.scrollTop = objDiv.scrollHeight;
        };
    });

}



