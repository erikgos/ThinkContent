app.models.Question = Backbone.Model.extend({

    initialize: function() {
        this.set("questionsCount", app.data.questions.length);

        this.set("answer", 0);
        var answer_for_this_question = _.where(app.data.answers, { q: this.get("id") });
        if (answer_for_this_question.length > 0)
            this.set("answer", answer_for_this_question[0].a);

    }

});

