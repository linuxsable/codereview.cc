// Author: Tyler
(function() {
    window.App = {
        root: '/',

        Views: {},
        Routers: {},
        Models: {},
        Collections: {},

        helpers: {
            
        },

        start: function(options) {
            options = options || {};

            Parse.initialize("Gm97bunEwR2nDQWO0SULDGNwxtPLZsorqYrR7UjR", "1MqGClUuY7U5B87d6D4US6sTBBLgtDrMFqhTnPbk");

            var router = new App.Routers.Main;

            Backbone.history.start({ pushState: true });

            // // All navigation that is relative should be passed through the navigate
            // // method, to be processed by the router. If the link has a `data-bypass`
            // // attribute, bypass the delegation completely.
            // $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
            //     // Get the absolute anchor href.
            //     var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
            //     // Get the absolute root.
            //     var root = location.protocol + "//" + location.host + App.root;

            //     // Ensure the root is part of the anchor href, meaning it's relative.
            //     if (href.prop.slice(0, root.length) === root) {
            //         // Stop the default event to ensure the link will not cause a page
            //         // refresh.
            //         evt.preventDefault();

            //         // `Backbone.history.navigate` is sufficient for all Routers and will
            //         // trigger the correct events. The Router's internal `navigate` method
            //         // calls this anyways.  The fragment is sliced from the root.
            //         Backbone.history.navigate(href.attr, true);
            //     }
            // });
        }
    };
})();
