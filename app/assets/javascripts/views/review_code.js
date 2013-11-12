App.Views.ReviewCode = Backbone.View.extend({
    tagName: 'div',
    className: 'code',

    events: {
        
    },

    initialize: function() {
        this.template = $('#tpl-review-code').html();
    },

    render: function() {
        var model = this.model;

        this.$el.html(Mustache.render(this.template, _.extend(this.model.attributes, {
            typeName: function() {
                if (model.get('type') == 1) {
                    return 'Ruby';
                }
                else if (model.get('type') == 2) {
                    return 'Javascript';
                }
                else {
                    return 'Unknown Lang';
                }
            }
        })));

        _.defer(function() {
            prettyPrint();
        });
        
        return this;
    }
});
