App.Views.ReviewInlineComment = Backbone.View.extend({
    tagName: 'div',
    className: 'inline-comment',

    events: {
        
    },

    initialize: function(options) {
        this.template = $('#tpl-review-inline-comment').html();
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {
            
        }));

        return this;
    }
});
