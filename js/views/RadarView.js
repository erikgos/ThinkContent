app.views.RadarView = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(app.utils.templates.get('RadarView'));
        this.$el.attr("id", "radar");

        // Decide whether we're showing the current user's results or the average ones
        if (app.data.scores.avgSelected) {
            this.title = 'Average results';
            this.result = app.data.scores.newAverage;
        } else {
            this.title = 'Your results';
            this.result = app.data.scores.you;
        }

        var that = this;
        $(document).one("pageinit", "#radar", function() {
            that.drawChart(that.result);
        });
    },

    render: function () {
        $(this.el).html(this.template( { title : this.title }));
        return this;
    },

    drawChart: function(result) {
        // Update canvas size based on window width
        var radar_size = $(window).width() - 20;
        $("#radar_container").width(radar_size).height(radar_size);

        // Generate Radar graph
        var canvas = $("#radar_container canvas")[0];
        var context = canvas.getContext('2d');
        var radarChartData = {
            labels : [
                "Competencies",
                "Planning",
                "Creation",
                "Distribution",
                "Performance",
                "Management"
            ],
            datasets : [
                {
                    fillColor : "rgba(151,187,205,0.5)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                    data : [
                        result.competencies,
                        result.planning,
                        result.creation,
                        result.distribution,
                        result.performance,
                        result.management
                    ]
                }
            ]

        }
        var radarChartOptions = {
            scaleOverlay: true,
            scaleShowLabels : true,
            scaleLineWidth : 4,
            pointLabelFontSize : 22
        };
        new Chart(context).Radar(radarChartData, radarChartOptions);
    }
});
