App.Routers.Main = Backbone.Router.extend({
    routes: {
        '': 'index',
        'r/:id': 'review',
        'review/new': 'newReview'
    },

    initialize: function(options) {
        options = options || {};

        var header = new App.Views.MainHeader;
        $('body').prepend(header.render().el);
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
    },

    newReview: function() {
        var view = new App.Views.NewReview;
        $('.main-content').html(view.render().el);
    }
});
