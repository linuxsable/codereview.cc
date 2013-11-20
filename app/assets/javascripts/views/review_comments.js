App.Views.ReviewComments = Backbone.View.extend({
    tagName: 'div',
    className: 'comments',

    events: {
        'click .submit': 'submitNewComment'
    },

    sendingComment: false,

    initialize: function(options) {
        this.template = $('#tpl-review-comments').html();
        this.comments = options.comments || [];

        this.setupElements();
    },

    render: function() {
        var commentViews = [];

        this.$el.html(Mustache.render(this.template, {
            showNoComments: !this.comments.length
        }));

        this.setupElements();

        // Append the comments
        _.each(this.comments, function(comment) {
            var view = new App.Views.ReviewComment({
                model: comment
            });
            this.$list.append(view.render().el);
        }.bind(this));

        return this;
    },

    setupElements: function() {
        this.$list = this.$('.list');
    },

    submitNewComment: function() {
        if (!Parse.User.current()) {
            return alert('Must be logged in to post');
        }

        if (!this.$('textarea').val().length) {
            return alert('Please write something');
        }

        if (this.sendingComment) {
            console.log('returning');
            return;
        }
        this.sendingComment = true;

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
                commentQuery.ascending('createdAt');

                commentQuery.find({
                    success: function(_comments) {
                        this.comments = _comments;
                        this.render();
                        this.sendingComment = false;
                    }.bind(this)
                });
            }.bind(this),

            error: function() {
                this.sendingComment = false;
            }
        });
    }
});
