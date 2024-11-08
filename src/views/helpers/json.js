export default {
    register(Handlebars) {
        Handlebars.registerHelper('json', function(context) {
            return JSON.parse(context);
        });
    }
};
