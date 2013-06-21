app.views.ReportView = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(app.utils.templates.get('ReportView'));
        this.$el.attr("id", "report");

        _.bindAll(this, 'sendResults');
    },

    events: {
        "vclick #sendResultsBtn" : "sendResults"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    sendResults: function(e) {
        e.preventDefault();

        // Retrieve user input from template
        var user_input = {};
        user_input.first_name = $("#firstName").val();
        user_input.last_name = $("#lastName").val();
        user_input.company = $("#company").val();
        user_input.email = $("#email").val();
        user_input.phone = $("#phone").val();

        // Check for errors
        if (!this.validate(user_input))
            return;

        var results_to_submit = this.getResultsToSubmit(user_input);

        app.utils.server.sendReport(results_to_submit,
            function() {
                notify('Your results were successfully submitted', 'success', { autoClose: 2000 });

                $("#firstName").val('');
                $("#lastName").val('');
                $("#company").val('');
                $("#email").val('');
                $("#phone").val('');
            },
            function() {
                notify('Your results could not be submitted at this time. Please try again later.', 'error', { autoClose: 2000 });
            });

        return false;
    },

    validate: function(data) {
        if (data.first_name === '' || data.last_name === '' || data.email === '') {
            notify('First name, last name and email must not be empty.', 'error', { autoClose: 2000 });
            return false;
        }

        if (!this.isEmailAddress(data.email)) {
            notify('Not a valid email address.', 'error', { autoClose: 2000 });
            return false;
        }

        return true;
    },

    isEmailAddress: function(text){
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!text.match(pattern))
            return false;
        return true;
    },

    getResultsToSubmit: function(user_input) {
        var answers = app.data.answers;
        var total = app.data.scores.you.total;
        var categories = {
            competencies: app.data.scores.you.competencies,
            management: app.data.scores.you.management,
            planning: app.data.scores.you.planning,
            performance: app.data.scores.you.performance,
            distribution: app.data.scores.you.distribution,
            creation: app.data.scores.you.creation,
        };

        if (app.data.scores.avgSelected) {
            total = app.data.scores.newAverage.total;
            categories = {
                competencies: app.data.scores.newAverage.competencies,
                management: app.data.scores.newAverage.management,
                planning: app.data.scores.newAverage.planning,
                performance: app.data.scores.newAverage.performance,
                distribution: app.data.scores.newAverage.distribution,
                creation: app.data.scores.newAverage.creation,
            };
        }

        return {
            first_name: user_input.first_name,
            last_name: user_input.last_name,
            company: user_input.company,
            email: user_input.email,
            phone: user_input.phone,
            answers: answers,
            score: {
                total: total,
                categories: categories
            }
        };
    }
});
