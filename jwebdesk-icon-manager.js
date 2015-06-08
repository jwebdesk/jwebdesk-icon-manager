define([
    "jwebkit",
    "jwebkit.ui",
    "jwebdesk"
], function(jwk, ui, jwebdesk) {

    jwebdesk.IconManager = function () {                
        jwk.Node.call(this);
        var manager = this;
        // manager._sessions  = new jwk.Node();
        manager.createService();
        
        jwebdesk.repository.require(["jwebdesk-icon-manager"]).done(function (pack) {
            //console.log("----------- tiene que haber un mapping -----------");
            //console.log(pack.get("config.iconmap").valueOf());
            
            iconsets = pack.config.iconsets.valueOf();
            iconmap = pack.config.iconmap.valueOf()
            var packages = [];
            for (var set in iconsets) {
                packages.push(iconsets[set]);
            } 
            manager.loadIconsetPackages(packages);
            
            
            
            var icons = jwk.Node();
            for (var i in iconmap) {
                icons.set(i, iconmap[i].class + " " + iconmap[i].iconset);
            } 
            // console.log("icons:" , icons);
            // console.log("------------------------------------------------------------");
            jwk.ui.icon.set("iconmap", icons);
            
        });
    }
    
    jwebdesk.IconManager.prototype = new jwk.Node();
    jwebdesk.IconManager.prototype.constructor = jwebdesk.IconManager;
    
    jwebdesk.IconManager.prototype.createService = function () {
        var manager = this;

         jwebdesk.wait_flag("initialized").done(function () {
            var service = jwk.global.proxy();

            service.register_function({
                addIcon: function (name, data) { 
                    console.error("Not implemented yet");
                }
            }, manager);

            jwebdesk.register_service("icon-manager", service);

        });         
    }
    jwebdesk.IconManager.prototype.loadIconsetPackages = function (packages) {
        // console.log("jwebdesk.IconManager.prototype.loadIconsetPackages(",packages,")");
        var deferred = jwk.Deferred();
        if (Array.isArray(packages) && packages.length > 0 || typeof packages == "string") {
            jwebdesk.repository.require(packages, function () {
                deferred.resolve.apply(deferred, arguments);
            });
        } else {
            console.log("ERROR: this is not a package list: ", packages);
            deferred.reject();
        }
        return deferred.promise();
    }
    var icon_manager = new jwebdesk.IconManager();
    
    return icon_manager;
});