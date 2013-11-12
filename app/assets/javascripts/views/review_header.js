App.Views.ReviewHeader = Backbone.View.extend({
    tagName: 'header',
    className: 'review-header',

    events: {
        
    },

    initialize: function() {
        this.template = $('#tpl-review-header').html();

        this.model.get('parent').fetch({
            success: function() {
                this.render();
            }.bind(this)
        });
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {
            name: function() {
                var user = this.model.get('parent');
                if (!user._hasData) return;
                return user.get('fbFirstName') + ' ' + user.get('fbLastName');
            }.bind(this),

            timestamp: function() {
                return this.model.createdAt;
            }.bind(this),

            avatarUrl: function() {
                var user = this.model.get('parent');
                if (!user._hasData) return;
                return 'http://graph.facebook.com/' + user.get('fbId') + '/picture';
            }
        }));

        return this;
    }
});
