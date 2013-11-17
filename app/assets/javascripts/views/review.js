App.Views.Review = Backbone.View.extend({
    tagName: 'div',
    className: 'review',

    events: {

    },

    comments: [],
    subViews: {},

    initialize: function(options) {
        this.comments = options.comments || [];

        this.subViews.reviewHeader = new App.Views.ReviewHeader({
            model: this.model
        });

        this.subViews.reviewCode = new App.Views.ReviewCode({
            model: this.model
        });

        this.subViews.reviewComments = new App.Views.ReviewComments({
            model: this.model,
            comments: this.comments
        });

        this.setPageTitle();

        this.render();
    },

    render: function() {
        this.$el.append(this.subViews.reviewHeader.render().el);
        this.$el.append(this.subViews.reviewCode.render().el);
        this.$el.append(this.subViews.reviewComments.render().el);
    },

    setPageTitle: function() {
        document.title = App.pageTitleBase + ' - ' + this.model.get('filename');
    }
});
