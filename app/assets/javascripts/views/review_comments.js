App.Views.ReviewComments = Backbone.View.extend({
    tagName: 'div',
    className: 'comments',

    events: {
        'click .submit': 'submitNewComment'
    },

    initialize: function(options) {
        this.template = $('#tpl-review-comments').html();
        this.comments = options.comments || [];
    },

    render: function() {
        var commentViews = [];

        this.$el.html(Mustache.render(this.template, {
            comments: function() {
                var out = '';
                _.each(this.comments, function(comment) {
                    var view = new App.Views.ReviewComment({
                        model: comment
                    });
                    commentViews.push(view);
                    out += view.render().el.outerHTML;
                });
                return out;
            }.bind(this)
        }));

        return this;
    },

    submitNewComment: function() {
        if (!Parse.User.current()) {
            return alert('Must be logged in to post');
        }

        var Comment = Parse.Object.extend('Comment');
        var comment = new Comment();

        comment.set('content', this.$('textarea').val());
        comment.set('user', Parse.User.current());
        comment.set('review', this.model);

        comment.save({
            success: function() {
                // Fetch new comments
                var comment = Parse.Object.extend('Comment');
                var commentQuery = new Parse.Query(comment);

                commentQuery.equalTo('review', this.model);
                commentQuery.include('user');

                commentQuery.find({
                    success: function(_comments) {
                        this.comments = _comments;
                        this.render();
                    }.bind(this)
                });
            }.bind(this),

            error: function() {

            }
        });
    }
});
