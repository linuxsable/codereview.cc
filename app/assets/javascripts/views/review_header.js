App.Views.ReviewHeader = Backbone.View.extend({
    tagName: 'header',
    className: 'review-header',

    events: {
        
    },

    initialize: function() {
        this.template = $('#tpl-review-header').html();
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, {}));
        return this;
    }
});
