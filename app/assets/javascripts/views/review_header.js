App.Views.ReviewHeader = Backbone.View.extend({
    tagName: 'header',
    className: 'review-header',

    events: {
        
    },

    initialize: function() {
        this.template = $('#tpl-review-header').html();
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {
            name: function() {
                var user = this.model.get('parent');
                return user.get('fbFirstName') + ' ' + user.get('fbLastName');
            }.bind(this),

            timestamp: function() {
                return moment(this.model.createdAt).format('MMM Do, YYYY');
            }.bind(this),

            avatarUrl: function() {
                var user = this.model.get('parent');
                return 'http://graph.facebook.com/' + user.get('fbId') + '/picture';
            }.bind(this)
        }));

        return this;
    }
});
