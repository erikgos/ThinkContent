app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""                 : "home",
        "question/:index"  : "question",
        "scores"           : "scores",
        "radar"            : "radar",
        "report"           : "report",
        "updates"          : "updates"
    },

    home: function () {
        var data = new app.models.Home();
        this.changePage(new app.views.HomeView({model:data}));
    },

    question: function (index) {
        if(index === undefined || isNaN(index)) index = 1;
        var data = new app.models.Question(app.data.questions[index - 1]);
        this.changePage(new app.views.QuestionView({model:data}));
    },

    scores: function() {
        var data = new app.models.Scores();
        this.changePage(new app.views.ScoresView({model:data}));
    },

    radar: function () {
        this.changePage(new app.views.RadarView());
    },

    report: function () {
        this.changePage(new app.views.ReportView());
    },

    updates: function () {
        this.changePage(new app.views.UpdatesView());
    },

    changePage:function (page) {
        // Set element container as jQuery mobile page
        $(page.el).attr('data-role', 'page');

        // Rendering the updated content
        page.render();

        // Add element to body (will pe removed on pagehide)
        $('body').append($(page.el));

        // Change page, the jQuery mobile way
        $.mobile.changePage($(page.el), { changeHash:false });
    }

});
