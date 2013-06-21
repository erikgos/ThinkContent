app.views.ScoresView = Backbone.View.extend({
    self: {},

    initialize: function () {
        this.template = _.template(app.utils.templates.get('ScoresView'));
        this.$el.attr("id", "scores");
    },

    yourColleagueScore: function(row) {
        var yourCollegueX = 0;
        var yourCollegueX = $($(".inputContainer").find('input')[row]).val();
        yourCollegueX = parseFloat(yourCollegueX);
        return yourCollegueX;
    },

    newAverageScore: function (row) {
        var newAvgX = 0;
        newAvgX = $('table tbody td:nth-child(4)').eq(row).text();
        newAvgX = parseFloat(newAvgX.substring(0, newAvgX.length - 1));
        return newAvgX;
    },
    avgSelected: function(selected) {
        if (selected) {
            $('table td:nth-child(2)').removeClass('selected-column');
            $('table td:nth-child(4)').addClass('selected-column');
            $('#youSelected').removeClass('thSelected');
            $('#avgSelected').addClass('thSelected');
            app.data.scores.avgSelected = true;
        } else {
            $('table td:nth-child(4)').removeClass('selected-column');
            $('table td:nth-child(2)').addClass('selected-column');
            $('#avgSelected').removeClass('thSelected');
            $('#youSelected').addClass('thSelected');
            app.data.scores.avgSelected = false;
        }
    },

    bindTable: function (e) {
        var pid = e.target.id;

        if (pid !== 'scores') {
            $(document).off('pageinit', self.bindTable);
            return;

        }

        _.each($('table tbody td:nth-child(2)'), function (elem) {
            if ($(elem).text() === 'NaN%') {
                $(elem).text('0%');
            }
        });

        _.each($(".inputContainer").find('input'), function (elem) {
            if ($(elem).val() === 'NaN' || $(elem).val() === '') {
                $(elem).val('0');
            }

        });

        self.avgSelected(self.model.get("scores").avgSelected);

        $('#youSelected').on('vclick', function () {
            self.avgSelected(false);
        });

        $('#avgSelected').on('vclick', function () {
            self.avgSelected(true);
        });

        $('table tbody tr td input').keyup(function () {
            var rowEdit = $(this).parents('tr');
            var you = $(rowEdit).children().eq(1).text();
            you = parseFloat(you.substring(0, you.length - 1));
            var yourCollegue = $(rowEdit).children().eq(2).find("input").val();
            yourCollegue = parseFloat(yourCollegue);
            var newAvgX = (parseFloat(you + yourCollegue) / 2).toFixed() + '%';
            $(rowEdit).children().eq(3).html(newAvgX);

            var totalColleague = 0;
            var totalAverage = 0
            _.each($(".inputContainer").find('input'), function (elem) {
                if ($(elem).val() === 'NaN' || $(elem).children().eq(3).find("input").val() === '') {
                    $(elem).val('0');
                }

            });

            _.each($('table tbody td:nth-child(4)'), function (elem) {
                if ($(elem).text() === 'NaN%' || $(elem).text() === '') {
                    $(elem).text('0%');
                }
            });

            window.app.data.scores.yourColleague = {
                competencies: self.yourColleagueScore(0),
                planning: self.yourColleagueScore(1),
                creation: self.yourColleagueScore(2),
                distribution: self.yourColleagueScore(3),
                performance: self.yourColleagueScore(4),
                management: self.yourColleagueScore(5),
                total: self.yourColleagueScore(6)
            };

            window.app.data.scores.newAverage = {
                competencies : self.newAverageScore(0),
                planning: self.newAverageScore(1),
                creation: self.newAverageScore(2),
                distribution: self.newAverageScore(3),
                performance: self.newAverageScore(4),
                management: self.newAverageScore(5),
                total: self.newAverageScore(6)
            };

            app.utils.localStorage.update();
        });

        return this;
    },

    render: function () {
        self = this;

        $(this.el).html(this.template(this.model.toJSON()));

        app.utils.localStorage.update();

        $(document).on('pageinit', self.bindTable);
    }
});
