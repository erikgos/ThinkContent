app.views.UpdatesView = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(app.utils.templates.get('UpdatesView'));
        this.$el.attr("id", "updates");
    },

    events: {
        "vclick #getLatestQBtn": "getLatestQuestions"
    },

    render: function () {
        $(this.el).html(this.template(this.model));
        return this;
    },

    getLatestQuestions: function () {
        var success = function (data) {
            app.utils.questions.restart();
            app.data.questions = data;
            app.utils.localStorage.update();
            $.mobile.loading('hide');
            notify('Questions were successfully updated!', 'success', { autoClose: 3000 });
        };
        var error = function (data) {
            $.mobile.loading('hide');
            notify('The questions could not be retrieved at this time. Please try again later.', 'error', { autoClose: 2000 });
        };
        
        confirmRequest('You are about to get the latest questions. If successful, all previous saved data will be deleted.', function () {
            $.mobile.loading('show');
            app.utils.server.getQuestions(success, error);
        });

    }
});
