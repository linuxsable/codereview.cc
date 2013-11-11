App.Routers.Main = Backbone.Router.extend({
    routes: {
        '': 'index',
        'r/:id': 'review'
    },

    initialize: function(options) {
        options = options || {};

        Parse.initialize("Gm97bunEwR2nDQWO0SULDGNwxtPLZsorqYrR7UjR", "1MqGClUuY7U5B87d6D4US6sTBBLgtDrMFqhTnPbk");
    },

    index: function() {

    },

    review: function(id) {
        var review = Parse.Object.extend('Review');
        var query = new Parse.Query(review);

        query.get(id, {
            success: function(review) {
                var view = new App.Views.Review({
                    el: $('.review'),
                    model: review
                });
            },

            error: function() {
                console.log(arguments);
            }
        });
    }
});
