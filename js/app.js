$(document).ready(function () {
    $("#search").on("click", function () {
        var searchTerm = $("#searchField").val();
        if(searchTerm === "") {
            $("#error").removeClass("hidden");
            $("#articles").empty();
            return;
        } 
        $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var len = data[1].length;
            printResult(data);
        },
        error: function (errorMessage) {
        }
    });


    });
    $("#searchField").keyup(function (e) {
        if(e.keyCode == 13) {
            $("#search").click();
        }
    })
});

function printResult(data) {
    console.log(data);
    $("#articles").empty();
    var len = data[1].length;
    if(len > 0) {
        for(var i =0; i < len; i++) {
            title = data[1][i];
            newArticle = '<div class="col-xs-10 col-xs-push-1 article"><a class="link"><h1 class="title"></h1></a><p class="description"></p></div>';
            $("#articles").append(newArticle);
            $(".title:last").html(title);
            desc = data[2][i];
            $(".description:last").html(desc);
            link = data[3][i];
            $(".link:last").attr("href", link);
        }
    }
}

