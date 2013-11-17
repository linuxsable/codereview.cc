App.Views.ReviewCode = Backbone.View.extend({
    tagName: 'div',
    className: 'code',

    events: {
        // 'mouseover .content pre ol li': 'mouseoverLine',
        // 'mouseleave .content pre ol li': 'mouseleaveLine',
        // 'click .content pre ol li': 'clickLine'
    },

    initialize: function() {
        this.template = $('#tpl-review-code').html();
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
                    return 'Unknown Lang';
                }
            },

            filename: function() {
                if (model.get('filename').length) {
                    return model.get('filename');
                } else {
                    return 'Untitled';
                }
            }
        })));

        _.defer(function() {
            prettyPrint();
        });
        
        return this;
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
    }
});
