App.Views.ReviewCommentsNew = Backbone.View.extend({
    tagName: 'div',
    className: 'comments',

    events: {
        'click .submit': 'submitNewComment'
    },

    initialize: function() {
        this.template = $('#tpl-review-comments').html();
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {}));
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
                console.log('success');
            },

            error: function() {

            }
        });
    }
});
