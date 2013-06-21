
app.utils.localStorage = (function () {

   var  update = function () {
            window.localStorage.setItem("app.data", JSON.stringify(app.data));
        },

        getQuestions = function () {
            var appData = window.localStorage.getItem("app.data");
            if (appData) {
                return JSON.parse(window.localStorage.getItem("app.data")).questions;
            }
            else {
                return null;
            }
        },
      
        getData = function() {
            var appData = window.localStorage.getItem("app.data");
            if (appData) {
                return JSON.parse(window.localStorage.getItem("app.data"));
            }
            else {
                return {
                    answers: [],
                    lastQuestion : 0,
                    questions: [],
                    scores: {
                        you: {
                            competencies: 0,
                            management: 0,
                            planning:0,
                            performance: 0,
                            distribution: 0,
                            creation: 0,
                            total:0

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
                    report : {
                        firstName: '',
                        lastName: '',
                        company: '',
                        email: '',
                        phone: ''
                    }
                };
            }
        }



    return {
        update: update,
        getData: getData,
        getQuestions: getQuestions

    };

}());
