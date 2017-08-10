import {ServerManagerFactory,ServerManager} from '../index'
let serv:ServerManager
export function test1(port?:number){
    serv = ServerManagerFactory.createServerManager();
    serv.start({
        port:port || 3000,
        isMockEnabled:true,
        mockModulePath: '/Users/enrico/Develop/NewDynamicEngine/modules/de-mock-server-lib/bin/tests/TestMock.js',
        libraryLoaderPath : '/Users/enrico/Develop/NewDynamicEngine/modules/de-mock-server-lib/bin/tests/LibraryLoaderTest.js',
        localDBPath:'/Users/enrico/Develop/NewDynamicEngine/modules/de-mock-server-lib/bin/tests/testTemp',
        liveReload:true,
        liveReloadPath:'/Users/enrico/Develop/NewDynamicEngine/modules/de-mock-server-lib/bin/tests/TestMock.js'
    });
}

