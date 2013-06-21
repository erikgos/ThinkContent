app.utils.server = (function () {

    var getQuestions = function (success, error) {
        $.ajax({
            url: app.URLs.questions,
            dataType: 'json',
            type: 'GET',
            success: success,
            error: error
        })
    },
        sendReport = function (data_to_submit, success, error) {
            if (isPhonegap()) {
                if (navigator.connection.type == Connection.NONE) {
                    notify("Please connect to the Internet in order to send you results!", "error", { autoClose: 2000 });
                    return false;
                }
            }

            $.mobile.loading('show');
            $.ajax({
                url: app.URLs.report,
                data: data_to_submit,
                type: "POST",
                success: function(data) {
                    $.mobile.loading('hide');
                    success(data);
                },
                error: function(data) {
                    $.mobile.loading('hide');
                    error(data);
                }
            });
        };


    return {
        getQuestions: getQuestions,
        sendReport: sendReport
    };

}());
