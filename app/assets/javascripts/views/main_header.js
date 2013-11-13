App.Views.MainHeader = Backbone.View.extend({
    tagName: 'header',
    className: 'main',

    events: {
        'click .login': 'login'
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
        var _this = this;

        Parse.FacebookUtils.logIn(null, {
            success: function(user) {
                if (!user.existed()) {
                    FB.api('/me', function(resp) {
                        var currentUser = Parse.User.current();
                        currentUser.set('fbFirstName', resp.first_name);
                        currentUser.set('fbLastName', resp.last_name);
                        currentUser.set('fbUsername', resp.username);
                        currentUser.set('fbBio', resp.bio);
                        currentUser.set('fbId', parseInt(resp.id));
                        currentUser.save(null, {
                            success: function() {
                                _this.render();
                            },

                            error: function() {
                                alert('Something went wrong!');
                            }
                        });
                    });
                } else {
                    _this.render();
                }
            },

            error: function(user, error) {
                alert('Something went wrong!');
            }
        });
    }
});
