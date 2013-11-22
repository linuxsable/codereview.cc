App.Views.ReviewCode = Backbone.View.extend({
    tagName: 'div',
    className: 'code',

    events: {
        'mouseover': 'mouseover',
        'mouseleave': 'mouseleave',
        // 'mouseover .content pre ol li': 'mouseoverLine',
        // 'mouseleave .content pre ol li': 'mouseleaveLine',
        // 'click .content pre ol li': 'clickLine'
        'click .content header .admin .delete': 'editClicked',
        'click .content header .admin .delete': 'deleteClicked',
    },

    initialize: function() {
        this.template = $('#tpl-review-code').html();
        this.setupElements();
    },

    render: function() {
        var model = this.model;

        this.$el.html(Mustache.render(this.template, _.extend(this.model.toJSON(), {
            typeName: function() {
                if (model.get('type') == 1) {
                    return 'Ruby';
                }
                else if (model.get('type') == 2) {
                    return 'Javascript';
                }
                else if (model.get('type') == 3) {
                    return 'Other';
                }
                else {
                    return null;
                }
            },

            filename: function() {
                if (model.get('filename') && model.get('filename').length) {
                    return model.get('filename');
                } else {
                    return 'Untitled';
                }
            }
        })));

        _.defer(function() {
            prettyPrint();
        });

        this.setupElements();
        
        return this;
    },

    setupElements: function() {
        this.$admin = this.$('.admin');
    },

    mouseoverLine: function(e) {
        var $el = $(e.currentTarget);
        $el.find('span').css('background', '#eee');
    },

    mouseleaveLine: function(e) {
        var $el = $(e.currentTarget);
        $el.find('span').css('background', '#fff');
    },

    clickLine: function(e) {
        var $el = $(e.currentTarget);
        
        var comment = new App.Views.ReviewComment({

        });

        $el.append(comment.render().el);
    },

    mouseover: function() {
        var user = Parse.User.current();
        if (user && user.id == this.model.get('parent').id) {
            this.$admin.show();    
        }
    },

    mouseleave: function() {
        this.$admin.hide();
    },

    editClicked: function() {

    },

    deleteClicked: function() {
        var msg = 'Are you sure you want to delete this review?';

        if (confirm(msg)) {
            this.model.destroy({
                success: function() {
                    window.location = '/';
                },

                error: function() {
                    alert('Failed to delete review.');
                }
            });
        }
    }
});
