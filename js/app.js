function onDeviceReady() {
    app.data = app.utils.localStorage.getData();

    app.utils.templates = new app.utils.TemplateLoader();
    app.utils.templates.loadTemplates(
        ['WelcomeView', 'QuestionView', 'ScoresView', 'ReportView', 'RadarView', 'UpdatesView']
        , function(){
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
        }
    );
}

$(document).ready(function(){
    if (isPhonegap()) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady(); //this is the browser
    }
});



