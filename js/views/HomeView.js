app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(app.utils.templates.get('WelcomeView'));
        this.$el.attr("id", "home");
    },

    events: {
        "vclick #startBtn" : "updateQuestions"
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    updateQuestions: function() {
        if(this.model.get("startButtonMsg") != 'Continue') {
            event.preventDefault();
            app.utils.questions.load();
            return false;
        }
    }

});
