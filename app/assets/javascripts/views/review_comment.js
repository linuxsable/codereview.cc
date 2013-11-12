App.Views.ReviewComment = Backbone.View.extend({
    tagName: 'div',
    className: 'comment',

    events: {
        
    },

    initialize: function(options) {
        this.template = $('#tpl-review-comment').html();
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {
            content: this.model.get('content'),

            avatarUrl: function() {
                var user = this.model.get('user');
                if (!user._hasData) return;
                return 'http://graph.facebook.com/' + user.get('fbId') + '/picture';
            }.bind(this),

            username: function() {
                var user = this.model.get('user');
                if (!user._hasData) return;
                return user.get('fbFirstName') + ' ' + user.get('fbLastName');
            }.bind(this)
        }));

        return this;
    }
});
