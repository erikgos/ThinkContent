app.models.Home = Backbone.Model.extend({

    initialize: function() {
        this.set("startButtonMsg", 'Start');

        if (app.data.answers.length == 0) {
            this.set("startButtonMsg", 'Start');
            this.set("goToPage", 1);
        } else if (app.data.questions.length == app.data.answers.length && app.data.answers.length > 0) {
            this.set("startButtonMsg", 'Restart');
            this.set("goToPage",  1);
        } else if (app.data.questions.length > app.data.answers.length ) {
            this.set("startButtonMsg", 'Continue');
            if(app.data.lastQuestion == app.data.questions.length) {
                var answers_questions_ids = _.pluck(app.data.answers, 'q');;
                var unaswered_questions = _.filter(app.data.questions, function(question) {
                    return _.indexOf(answers_questions_ids, question.id) == -1;
                });
                app.data.lastQuestion = unaswered_questions[0].sorting_order - 1;
            }
            this.set("goToPage", app.data.lastQuestion + 1);
        }

        this.set("showFooter", false);

        if (app.data.questions.length == app.data.answers.length && app.data.answers.length > 0) {
            this.set("showFooter", true);
        }
    }
});

