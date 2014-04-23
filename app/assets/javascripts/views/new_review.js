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

        _.defer(function() {
            this.editor = CodeMirror.fromTextArea(this.$('textarea').get(0), {
                indentUnit: 2,
                lineNumbers: true,
                firstLineNumber: 1,
                theme: 'solarized',
                autofocus: true,
                viewportMargin: 800
            });
        }.bind(this));

        return this;
    },

    submit: function() {
        if (!this.editor.getValue().length) {
            return alert('You must submit code.');
        }

        var Review = Parse.Object.extend('Review');
        var review = new Review();

        review.set('filename', this.$('input[name="filename"]').val());
        review.set('type', parseInt(this.$('select').find(":selected").val()));
        review.set('code', this.editor.getValue());

        var matchedLines = this.editor.getValue().match(/\n/g);
        if (matchedLines) {
            review.set('lineCount', parseInt(matchedLines.length + 1));
        }

        // if (Parse.User.current()) {
        //     review.set('parent', Parse.User.current());
        // }

        // Make it only readable to other users
        var acl = new Parse.ACL();
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
