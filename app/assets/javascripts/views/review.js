App.Views.Review = Backbone.View.extend({
    tagName: 'div',
    className: 'review',

    events: {
        'mouseover .code .content pre ol li': 'mouseoverLine',
        'mouseleave .code .content pre ol li': 'mouseleaveLine',
        'click .code .content pre ol li': 'clickLine',
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

        this.render();
    },

    render: function() {
        this.$el.append(this.subViews.reviewHeader.render().el);
        this.$el.append(this.subViews.reviewCode.render().el);
        this.$el.append(this.subViews.reviewComments.render().el);
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
        $el.append('<div class="comment">test</div>');
    }
});
