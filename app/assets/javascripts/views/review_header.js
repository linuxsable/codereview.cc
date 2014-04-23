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
                // var user = this.model.get('parent');
                // if (user) {
                //     return user.get('fbFirstName') + ' ' + user.get('fbLastName');    
                // } else {
                //     return 'Anonymous';
                // }
                return 'Coder';
            }.bind(this),

            timestamp: function() {
                return moment(this.model.createdAt).format('MMM Do, YYYY');
            }.bind(this),

            avatarUrl: function() {
                // var user = this.model.get('parent');
                // if (user) {
                //     return 'http://graph.facebook.com/' + user.get('fbId') + '/picture';    
                // } else {
                //     return null;
                // }
                return null;
            }.bind(this)
        }));

        return this;
    }
});
