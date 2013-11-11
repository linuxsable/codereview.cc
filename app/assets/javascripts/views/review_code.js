App.Views.ReviewCode = Backbone.View.extend({
    tagName: 'div',
    className: 'code',

    events: {
        
    },

    initialize: function() {
        this.template = $('#tpl-review-code').html();
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {}));
        return this;
    }
});
