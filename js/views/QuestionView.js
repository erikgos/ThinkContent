app.views.QuestionView = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(app.utils.templates.get('QuestionView'));
        this.$el.attr("id", 'question-' + this.model.get("sorting_order"));
        this.$el.attr("class", 'question');

        _.bindAll(this, 'saveAnswer');
    },

    events: {
        "vclick #nextBtn" : "saveAnswer",
        "vclick #previousBtn" : "saveAnswer"
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    saveAnswer: function (target) {
        var selected_value = $("#" + this.$el.attr("id") + " input:checked").val();

        if(selected_value === undefined) {
            if (target.currentTarget.id === 'nextBtn') {
                notify('Please select an answer.', 'error', { autoClose: 2000 });
                event.preventDefault();
                return false;
            }
        }

        if(selected_value !== undefined) {
            // Save answer

            var current_answer = {
                q: this.model.get("id"),
                a: parseInt(selected_value)
            };

            app.data.answers = _.filter(app.data.answers, function(answer) {
                return current_answer.q !== answer.q;
            });

            app.data.answers.push(current_answer);
            app.data.lastQuestion = this.model.get("sorting_order"); // TODO Use index instead of sorting order here

            this.model.set("answer", selected_value);
            app.utils.localStorage.update();
        }

        // Navigate to next question
        if (target.currentTarget.id === 'nextBtn') {
            var index = this.model.get("sorting_order") + 1;
            if(index == (app.data.questions.length + 1)) {
                app.router.scores();
                app.router.navigate("scores");
            } else {
                app.router.question(index);
                app.router.navigate("question/" + index);
            }

        } else {
            var index = this.model.get("sorting_order") - 1;
            if(index === 0) {
                app.router.home();
                app.router.navigate("home");
            } else {
                app.router.question(index);
                app.router.navigate("question/" + index);
            }
        }

        return false;
    }

});
