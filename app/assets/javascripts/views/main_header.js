App.Views.MainHeader = Backbone.View.extend({
    tagName: 'header',
    className: 'main',

    events: {
        // 'click .login': 'login'
    },

    initialize: function() {
        this.template = $('#tpl-main-header').html();
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {
            loggedIn: function() {
                return !!Parse.User.current();
            },

            username: function() {
                var user = Parse.User.current();
                if (user) {
                    return user.get('fbFirstName') + ' ' + user.get('fbLastName');
                }
            },

            profileUrl: function() {
                var user = Parse.User.current();
                return 'http://facebook.com/' + user.get('fbUsername');
            },

            showBackButton: function() {
                return window.location.pathname != '/';
            },

            backButtonUrl: function() {
                return '/';
            }
        }));

        return this;
    },

    login: function() {
        App.helpers.logUserIn();
    }
});
