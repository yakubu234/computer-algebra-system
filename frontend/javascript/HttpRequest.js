var HttpClientPost = function () {
    this.get = function (aUrl, data, cSrf, aCallback) {
        console.log(aUrl)
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && (anHttpRequest.status >= 200 && anHttpRequest.status <= 299))
                aCallback(JSON.parse(anHttpRequest.responseText));

            if (anHttpRequest.readyState == 4 && (anHttpRequest.status >= 400 && anHttpRequest.status <= 499))
                aCallback(JSON.parse(anHttpRequest.responseText));

            if (anHttpRequest.readyState == 4 && (anHttpRequest.status >= 500 && anHttpRequest.status <= 599))
                aCallback(JSON.parse(anHttpRequest.responseText));
        }

        anHttpRequest.open("POST", aUrl, true);
        anHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        anHttpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        // anHttpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        anHttpRequest.setRequestHeader("Accept", "application/json");
        anHttpRequest.send(data);
    }
}

