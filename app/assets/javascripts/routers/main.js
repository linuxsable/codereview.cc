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
        var reviewQuery = new Parse.Query(review);
        reviewQuery.include('parent');

        var comment = Parse.Object.extend('Comment');
        var commentQuery = new Parse.Query(comment);

        reviewQuery.get(id, {
            success: function(review) {
                commentQuery.equalTo('review', review);
                commentQuery.include('user');
                commentQuery.find({
                    success: function(result) {
                        var view = new App.Views.Review({
                            el: $('.review'),
                            model: review,
                            comments: result
                        });
                    }
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
