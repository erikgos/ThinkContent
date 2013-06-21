app.models.Scores = Backbone.Model.extend({

    initialize: function() {
        app.data.scores.you.competencies =  this.getScoreForCategory('Competencies');
        app.data.scores.you.planning = this.getScoreForCategory('Planning');
        app.data.scores.you.creation = this.getScoreForCategory('Creation');
        app.data.scores.you.distribution = this.getScoreForCategory('Distribution');
        app.data.scores.you.performance = this.getScoreForCategory('Performance');
        app.data.scores.you.management = this.getScoreForCategory('Management');

        app.data.scores.you.total = this.getScore(app.data.answers);

        app.data.avgSelected = false;

        this.set("scores", window.app.data.scores);
    },

    getScoreForCategory : function(category) {
        // Retrieve questions in current category
        var questions = _.where(app.data.questions, { category: category });
        var questions_ids = _.pluck(questions, 'id');

        // Retrieve answers for the questions found
        var answers = _.filter(app.data.answers, function (answer) {
            return _.indexOf(questions_ids, answer.q) > -1;
        });

        // Calculate the score for the current category
        return this.getScore(answers);
    },

    getScore : function(answers) {
        // Calculate total points the user obtained
        var user_score = 0;
        _.each(answers, function (answer) {
            // Add current answer's value
            user_score += answer.a;
        });

        // Calculate the maximum available score
        var max_score = answers.length * 6; // Answers can weight from 1 to 6

        // Calculate user score
        var score = ((user_score / max_score) * 100).toFixed();

        if (isNaN(score)) {
            score = 0;
        }
        return score;
    }

});
