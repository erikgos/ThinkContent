app.utils.TemplateLoader = function() {
    this.templates = {};
    var self = this;

    this.loadTemplates = function(names, callback) {
        var index = 0;
        var loadTemplate = function(name) {
            $.get('templates/' + name + '.html', function(data){
                self.templates[name] = data;
                index++;
                if(index < names.length) {
                    loadTemplate(names[index]);
                } else {
                    callback();
                }
            });

        };

        loadTemplate(names[index]);
    };

    this.get = function(name) {
        return self.templates[name];
    };

};