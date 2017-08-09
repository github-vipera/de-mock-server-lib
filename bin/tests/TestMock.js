/**
 * Created by enrico on 08/08/17.
 */

//----------- MANDATORY BLOCK
;(function(){
    Controller = {};
    Controller.mock= {};
    Controller.mock.requestId=0;
    Controller.mock.appDomain=function(){
        return "VIPERALAB";
    }
    Controller.mock.appName=function(){
        return "E2EE_TESTS";
    }
    Controller.mock.sessionId=function(){
        return "SESSION_MOCK_12345";
    }
    Controller.mock.newRequestId=function(){
        return Controller.mock.requestId++;
    }
    Controller.mock.userId=function(){
        return "USER_ID_OO1";
    }
    Controller.mock.init=undefined;

    // executed automatically after device ready event
    Controller.mock.appStarted=function(){
        console.log("Override appStarted");
        DEStorage.set("pippo","asdasasdasdas");
        NativeStorage.get('echoCount',function (res) {
            console.log("echoCount:",res);
            Controller.mock.echoCount = res ? res : 0;
        },function (err) {
            console.error("echoCount error:",err);
        });

        Controller.mock.init=true;
    }

    //------------ END OF MANDATORY

    /**
     * Utilities for build response
     */
    Controller.mock.buildResponseFromRequest = function(request,responseHeader) {
        var app = request.req.app;
        var dom = request.req.dom;
        var op = request.req.op;
        var srv = request.req.srv;
        var resp = {
            "res" : {
                "header" : {
                }
            }
        };
        if(responseHeader != undefined){
            resp.res.header = responseHeader;
        }
        resp.res.header.dom = dom;
        resp.res.header.app = app;
        resp.res.header.srv = srv;
        resp.res.header.op  = op;
        return resp;
    }
    // EXAMPLE: define service named MOCK with one operation (named echo)
    Controller.mock.COMMON ={
        echo:function(request){
            var newHeader = {
                value : DEStorage.get('pippo'),
                valueNS: Controller.mock.echoCount++,
            }
            var resp=Controller.mock.buildResponseFromRequest(request,newHeader);
            NativeStorage.set('echoCount',Controller.mock.echoCount);
            return resp;
        }
    }

})();

