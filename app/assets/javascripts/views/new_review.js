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
        if (!Parse.User.current()) {
            return alert('Must be logged in to post');
        }

        if (!this.$('textarea').val().length) {
            return alert('Please submit code');
        }

        var Review = Parse.Object.extend('Review');
        var review = new Review();

        review.set('filename', this.$('input[name="filename"]').val());
        review.set('type', parseInt(this.$('select').find(":selected").val()));
        review.set('code', this.$('textarea').val());
        review.set('parent', Parse.User.current());

        review.save({
            success: function() {
                window.location = '/r/' + review.id;
            },

            error: function() {

            }
        });
    }
});
