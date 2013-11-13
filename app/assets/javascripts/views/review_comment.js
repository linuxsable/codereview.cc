App.Views.ReviewComment = Backbone.View.extend({
    tagName: 'div',
    className: 'comment',

    events: {
        'click': 'a'
    },

    initialize: function(options) {
        this.template = $('#tpl-review-comment').html();
    },

    render: function() {
        var runPrettyPrint = false;

        this.$el.html(Mustache.render(this.template, {
            content: function() {
                var content = this.model.get('content');
                var codeRegex = /<pre\b[^>]*>/;

                // If they are using the code thing,
                // let's place it with our pretty print one
                if (codeRegex.test(content)) {
                    var tag = '<pre class="prettyprint linenums">';
                    var content = content.replace(codeRegex, tag);
                    runPrettyPrint = true;
                }

                return content;
            }.bind(this),

            avatarUrl: function() {
                var user = this.model.get('user');
                return 'http://graph.facebook.com/' + user.get('fbId') + '/picture';
            }.bind(this),

            username: function() {
                var user = this.model.get('user');
                return user.get('fbFirstName') + ' ' + user.get('fbLastName');
            }.bind(this)
        }));

        if (runPrettyPrint) {
            _.defer(function() {
                prettyPrint();
            });
        }

        return this;
    },

    mouseenter: function() {
        console.log('hi');
        var user = this.model.get('user');
        if (user) {
            if (user.id == Parse.User.current().id) {
                this.$('.delete').show();
            }
        }
    },

    mouseleave: function() {
        this.$('.delete').hide();
    },

    a: function() {
        console.log('bacon');
    }
});