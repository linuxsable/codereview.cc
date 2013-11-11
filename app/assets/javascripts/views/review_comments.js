App.Views.ReviewComments = Backbone.View.extend({
    tagName: 'div',
    className: 'comments',

    events: {
        
    },

    initialize: function() {
        this.template = $('#tpl-review-comments').html();
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {}));
        return this;
    }
});
