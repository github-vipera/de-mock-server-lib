"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var serv;
function test1(port) {
    serv = index_1.ServerManagerFactory.createServerManager();
    serv.start({
        port: port || 3000,
        isMockEnabled: true,
        mockModulePath: '/Users/enrico/Develop/NewDynamicEngine/modules/de-mock-server-lib/bin/tests/TestMock.js',
        libraryLoaderPath: '/Users/enrico/Develop/NewDynamicEngine/modules/de-mock-server-lib/bin/tests/LibraryLoaderTest.js',
        localDBPath: '/Users/enrico/Develop/NewDynamicEngine/modules/de-mock-server-lib/bin/tests/testTemp',
        liveReload: true,
        liveReloadPath: '/Users/enrico/Develop/NewDynamicEngine/modules/de-mock-server-lib/bin/tests/TestMock.js'
    });
}
exports.test1 = test1;
//# sourceMappingURL=index.js.map