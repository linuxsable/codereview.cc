(function() {
    App.helpers = {
        logUserIn: function(callback) {
            callback = callback || function() {};

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
                                    callback();
                                },

                                error: function() {
                                    alert('Something went wrong!');
                                }
                            });
                        });
                    } else {
                        callback();
                    }
                },

                error: function(user, error) {
                    alert('Something went wrong!');
                }
            });
        }
    };
})();