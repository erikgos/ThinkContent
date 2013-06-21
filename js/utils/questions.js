
app.utils.questions = (function () {
    var restart = function() {
        app.data = {
            answers: [],
            questions: [],
            scores: {
                you: {
                    competencies: 0,
                    management: 0,
                    planning: 0,
                    performance: 0,
                    distribution: 0,
                    creation: 0,
                    total: 0
                },
                yourColleague: {
                    competencies: 0,
                    management: 0,
                    planning: 0,
                    performance: 0,
                    distribution: 0,
                    creation: 0,
                    total: 0
                },
                newAverage: {
                    competencies: 0,
                    management: 0,
                    planning: 0,
                    performance: 0,
                    distribution: 0,
                    creation: 0,
                    total: 0
                },
                avgSelected: false
            },
            report: {
                firstName: '',
                lastName: '',
                company: '',
                email: '',
                phone: ''
            }
        };
    },
        load = function() {
            restart();
            var getQuestionsFromDefaults = function() {
                app.data.questions = app.utils.defaultQuestions.load();
            };

            var getQuestionsFromLocalStorage = function() {
                var questions = app.utils.localStorage.getQuestions();
                if (questions && questions.constructor==Array && questions.length!==0) {
                    app.data.questions = questions;
                    $('#popupBasic').popup('open');
                } else {
                    getQuestionsFromDefaults();
                    app.utils.localStorage.update();
                    $('#popupBasic').popup('open');
                }
            };

            var getQuestionsFromServer = function() {
                $.mobile.loading('show');
                var success = function(data) {
                    $.mobile.loading('hide');
                    app.data.questions = data;
                    app.utils.localStorage.update();
                    $('#popupBasic').popup('open');
                };
                var error = function(data) {
                    $.mobile.loading('hide');
                    getQuestionsFromLocalStorage();
                };
                app.utils.server.getQuestions(success, error);

            };

            if (isPhonegap()) {
                if (navigator.connection.type == Connection.NONE) {
                    getQuestionsFromLocalStorage();
                } else {
                    getQuestionsFromServer();
                }
            } else {
                getQuestionsFromLocalStorage();
            }
        };


    return {
        restart: restart,
        load: load
    };

}());
