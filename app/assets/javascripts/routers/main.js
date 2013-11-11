App.Routers.Main = Backbone.Router.extend({
    routes: {
        '': 'index',
        'r/:id': 'review'
    },

    initialize: function(options) {
        options = options || {};
    },

    index: function() {

    },

    review: function(id) {
        var view = new App.Views.Review({ el: $('.review') });
    }
});
