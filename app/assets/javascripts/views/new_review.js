App.Views.NewReview = Backbone.View.extend({
    tagName: 'div',
    className: 'new-review',

    events: {
        'click .submit': 'submit'
    },

    initialize: function() {
        this.template = $('#tpl-new-review').html();
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {}));

        return this;
    },

    submit: function() {
        if (!this.$('textarea').val().length) {
            return alert('You must submit code.');
        }

        var Review = Parse.Object.extend('Review');
        var review = new Review();

        review.set('filename', this.$('input[name="filename"]').val());
        review.set('type', parseInt(this.$('select').find(":selected").val()));
        review.set('code', this.$('textarea').val());

        var matchedLines = this.$('textarea').val().match(/\n/g);
        if (matchedLines) {
            review.set('lineCount', parseInt(matchedLines.length + 1));
        }

        if (Parse.User.current()) {
            review.set('parent', Parse.User.current());
        }

        // Make it only readable to other users
        var acl = new Parse.ACL(Parse.User.current());
        acl.setPublicReadAccess(true);
        review.setACL(acl);

        review.save({
            success: function() {
                window.location = '/r/' + review.id;
            },

            error: function() {

            }
        });
    }
});
