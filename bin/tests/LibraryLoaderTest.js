/**
 * Created by enrico on 09/08/17.
 */
module.exports = function(reload,serviceBridge){
    /* use reload to require js file or npm modules
     * and use serviceBridge for access to service
     * such as persistenceService (aka NativeStorage) or
     * localStorage emulator (aka DEStorage)
     */
    var toolsNativeStorage = serviceBridge.getService("nativeStorage");
    var toolsDEStorage = serviceBridge.getService("localStorage");
    var toolsUtilities = serviceBridge.getService("Utilities");

    //var libraryPath="./www/lib/";
    //moment = require(libraryPath + 'moment.js');
    //_ = require(libraryPath + 'lodash.min.js');

    //Define your custom adapter here (N.B: define adapter globally);
    /* example: support native storage set and getString api:*/
    NativeStorage = {
        set:function(key,value,success,fail){
            toolsNativeStorage.setItem(key,value,success,fail);
        },
        get:function(key,success,fail){
            toolsNativeStorage.getItem(key,success,fail);
        }
    };

    DEStorage = toolsDEStorage;
    Utilities = toolsUtilities;
}
