/**
 * exit事件和beforeExit事件
 * exit事件提供一个退出状态码
 * 进程退出状态码：
 * 1 Uncaught Fatal Exception   因没有被捕获的异常而退出，这里的没有被捕获指的是没有被程序中代码和process的uncaughtException捕获
 * 2 未使用 (reserved by Bash for builtin misuse)
 * 3 Internal JavaScript Parse Error nodejs自身的javascript解析错误，这个很罕见，一般只在node自身项目开发过程中产生
 * 4 Internal JavaScript Evaluation Failure nodejs自身错误，同3
 * 5 Fatal Error  v8引擎致命错误
 * 6 Non-function Internal Exception Handler 未捕获异常，nodejs内部的异常处理函数指向了一个非函数对象
 * 7 Internal Exception Handler Run-Time Failure 内部异常处理器运行时错误，
 *   如process.on('uncaughtException') or domain.on('error') 的回调里边发生错误
 * 8 未使用 旧版本node偶尔用来表示未捕获异常
 * 9 Invalid Argument  函数参数不合法
 * 10 Internal JavaScript Run-Time Failure  nodejs的核心javascript文件运行错误，极少发生
 * 12 Invalid Debug Argument   启动时使用了 --debug  或者--debug-brk 参数，却设置了错误的调试端口
 * >128 Signal Exits 进程收到终止信号的时候，exit code是一个代表退出信号的大于128的数字，例如 SIGKILL 或者 SIGHUP
 *
 *
 * Windows下node无法直接发送process信号，但是提供了方法process.kill()和child_process.kill()来模拟发送信号
 * 发送信号 0 可以用来检测进程是否存在
 * 发送信号 SIGTERM、SIGINT和SIGKILL 会无条件终止终端运行
 * 信号列表：
 * SIGUSR1  nodejs保留用于启动调试进程相关操作
 * SIGTERM和SIGINT   在非windows平台下，如果这两个信号被设置了监听，那么终端就不会exit，改为执行绑定的监听事件
 *                   在windows环境下10s后cmd会强行关闭，进程还是会退出
 * SIGPIPE  这个信号会被process忽略，用户可以绑定监听回调来执行一些操作
 * SIGHUP 1.windows平台下，此信号会在终端关闭时发出，可以监听此信号来处理一些逻辑，但是10s后终端会强行关闭
 *        2.其他平台下，此信号的默认行为是关闭node终端，但是若给这个信号设置了监听函数，那么就会覆盖默认的关闭终端行为
 * SIGTERM  windows不支持，其他平台可以监听
 * SIGINT 全平台支持，一般在Ctrl+C时产生，但是在终端的raw mode下不产生
 * SIGBREAK 仅在windows上可被监听，Ctrl+Break时产生此信号，也是挺奇葩...  没有用过
 * SIGWINCH 终端尺寸改变时发出此信号
 * SIGKILL 无法被监听，所有平台上都是无条件关闭终端
 * SIGSTOP 无法被监听
 *
 */
function t1(){
    process.on("exit",function(code){
        setTimeout(function(){
            console.log("this will not run");
        },0);
        console.log("process exited!");
    });
    process.on("beforeExit",function(){
        console.log("process will exit!")
    })

}


/**
 * unhandledRejection事件和rejectionHandled事件
 * TODO create demo
 */
function t2(){
    var unhandledRejections = new Map();
    process.on('unhandledRejection', function(reason, p) {
        console.log("promise rejected:",p,"  reason:",reason);
        unhandledRejections.set(p, reason);
    });
    process.on('rejectionHandled', function(p) {
        console.log("reject handled:",unhandledRejections.get(p));
        unhandledRejections.delete(p);
    });
}

/**
 * uncaughtException事件
 */
function t3(){
    process.on("uncaughtException",function(err){
        console.log('Caught exception: ' + err);
    })
    setTimeout(function() {
        console.log('This will still run.');
    }, 5000);

// Intentionally cause an exception, but don't catch it.
    nonexistentFunc();
    console.log('This will not run.');
}

/**
 * arch 处理器类型 'arm', 'ia32', or 'x64'.
 * argv 获取程序的启动参数 0-node.exe路径 1- javascript文件名称，后边的是启动参数，可以用node index.js one two=three four 测试
 * execArgv 执行参数，例如 node --harmony index.js，这个属性里边的内容就是 --harmony，官方文档说用来生成子进程时采用相同的启动参数有用
 * cwd() 返回当前工作目录
 * chdir(dir) 更换进程工作目录
 * process.execPath 程序启动路径 D:\Program Files\nodejs\node.exe
 */
function t4(){
    console.log('This processor architecture is ' + process.arch);
    // print process.argv
    process.argv.forEach(function(val, index, array) {
        console.log(index + ': ' + val);
    });
    console.log('Starting directory: ' + process.cwd());
    try {
        process.chdir('../');
        console.log('New directory: ' + process.cwd());
    }
    catch (err) {
        console.log('chdir: ' + err);
    }
    console.log(process.execPath);
}

/**
 * TODO process.config，这些属性代表什么？
 */
function t5(){
    console.log(process.config);
    //{ target_defaults:
    //{ cflags: [],
    //    default_configuration: 'Release',
    //    defines: [],
    //    include_dirs: [],
    //    libraries: [] },
    //    variables:
    //    { asan: 0,
    //        host_arch: 'x64',
    //        icu_data_file: 'icudt56l.dat',
    //        icu_data_in: '../../deps/icu/source/data/in\\icudt56l.dat',
    //        icu_endianness: 'l',
    //        icu_gyp_path: 'tools/icu/icu-generic.gyp',
    //        icu_locales: 'en,root',
    //        icu_path: 'deps\\icu',
    //        icu_small: true,
    //        icu_ver_major: '56',
    //        node_byteorder: 'little',
    //        node_install_npm: true,
    //        node_prefix: '/usr/local',
    //        node_release_urlbase: '',
    //        node_shared_http_parser: false,
    //        node_shared_libuv: false,
    //        node_shared_openssl: false,
    //        node_shared_zlib: false,
    //        node_tag: '',
    //        node_use_dtrace: false,
    //        node_use_etw: true,
    //        node_use_lttng: false,
    //        node_use_openssl: true,
    //        node_use_perfctr: true,
    //        openssl_fips: '',
    //        openssl_no_asm: 0,
    //        python: 'C:\\Python27\\python.exe',
    //        target_arch: 'x64',
    //        v8_enable_gdbjit: 0,
    //        v8_enable_i18n_support: 1,
    //        v8_no_strict_aliasing: 1,
    //        v8_optimized_debug: 0,
    //        v8_random_seed: 0,
    //        v8_use_snapshot: 1,
    //        want_separate_host_toolset: 0 } }
}

/**
 * TODO demo process.disconnect() & process.disconnected
 * 关闭通向父进程的IPC通道，让子进程在没有任何存活连接的情况下优雅退出
 * 和ChildProcess.disconnect()相同
 * 若nodejs没有开启一个IPC通道，这个方法会是undefined
 *
 * IPC(Internet Process Connection)是共享"命名管道"的资源，它是为了让进程间通信而开放的命名管道，
 * 通过提供可信任的用户名和口令，连接双方可以建立安全的通道并以此通道进行加密数据的交换，
 * 从而实现对远程计算机的访问。
 */
function t6(){

}

/**
 * 可以写入process.env，不过只在进程内有效
 * $ node -e 'process.env.foo = "bar"' && echo $foo  这样是没有效果的
 */
function t7(){
    process.env.zcz="test";
    console.log(process.env)
}

/**
 * process.exit() 进程退出，退出码不写的话，默认是success的状态码 0
 * process.exitCode  为process.exit设置退出状态码，若exit方法不传状态码，则使用此处设置的，若传入了状态码参数，则使用传入的参数
 */
function t8(){
    process.exitCode=3;
    console.log(process.exitCode)

    process.on("exit",function(){
        console.log(arguments);
    });
    process.exit(1);

}

/**
 * only available on POSIX platforms
 */
function t9(){
    console.log('Current gid: ' + process.getegid());
    console.log('Current uid: ' + process.geteuid());
    console.log('Current gid: ' + process.getgid());
    console.log('Current gid: ' + process.getgroups());
    //process.initgroups(user, extra_group)
    //process.setegid(id);
    //process.seteuid(id)
    //process.setgid(id)
    //process.setgroups(groups)
    //process.setuid(id)
}

/**
 * 得到与过去某一时间点的时间差，结果是[秒,纳秒],精确且不受系统时钟影响
 */
function t10(){
    var time = process.hrtime();
    // [ 1800216, 25 ]
    setTimeout(function() {
        var diff = process.hrtime(time);
        // [ 1, 552 ]
        console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
        // benchmark took 1000000527 nanoseconds
    }, 1000);
}
/**
 * process.kill(pid[, signal]) 向id为pid的进程发出信号，长的像kill，但是实际上只是一个发信号的函数
 * 下面node官网的demo在win7x64下会报错：Error: kill ENOSYS
 * 原因是这个时间只能由windows的cmd关闭引发...  其他平台下是可以由代码发出的
 * 注释掉最后一句，手动X掉cmd，会先输出Got SIGHUP signal，两秒后cmd窗口才关闭
 * SIGHUP信号在windows中发生10s后，无论进程是否自己退出，都会强制干掉node进程
 */
function t11(){
    process.on('SIGHUP', function() {
        console.log('Got SIGHUP signal.');
    });
    setTimeout(function() {
        console.log('Exiting.');
        process.exit(0);
    }, 2000);
    process.kill(process.pid, 'SIGHUP');
}

/**
 * process.mainModule 获取require.main的另一种方法
 * 不同的是如果在运行时main module发生变化require.main可能仍指向变化之前的main模块
 * 不过一般情况下认为这俩指向的是同一个模块是没问题的
 */
function t12(){
    console.log(process.mainModule===require.main);//true
}

/**
 * process.memoryUsage 返回内存使用情况
 * heapTotal代表已申请到的堆内存，heapUsed当前使用的内存，rss(resident set size)进程的常驻内存
 * { rss: 17272832, heapTotal: 9275392, heapUsed: 4059760 }
 */
function t13(){
    var util = require('util');
    console.log(util.inspect(process.memoryUsage()));
}

/**
 * process.nextTick 作用和setTimeout(cb,0)相似，但是其回调的优先级更高，会被放在事件队列的最前面，而settimeout是放在最后面.
 * 理解此函数需要理解js的event loop概念，这是一个很重要的概念，理解如下：
 * 1.js引擎执行时，会把要执行的语句压入一个先入后出的执行栈(call stack)
 * 2.异步事件完成后，会向一个先进先出的任务队列(task queue)压入需要执行的事件回调(callback)
 * 3.浏览器中涉及到事件队列的东西：timer、dom evnet、ajax、dom渲染(注意，对dom的渲染并不是立即生效的，大多数浏览器16ms渲染一次)、
 *   fileReader相关等等
 * 4.event loop，js引擎每次把call stack里边的任务执行空之后，都去task queue里边去找，看有没有需要执行的callback，有的话就依次压入call stack执行
 * 5.process.nextTick的特点就在于，它没有任何event触发条件，会无条件立即将callback放入task queue的最前面，因而一旦js引擎将call stack执行空，
 *   下一次event loop将最先执行nextTick的callback，效率最高。有些运行环境下，setTimeout的时间是有最小限制的，比如4ms啥的，nextTick不会
 * 6.做javascript程序的时候应该永远考虑异步思想，不要做同步操作，那样会阻塞evnet loop
 * demo中输出顺序：by nextTick --- by settimeout0  --- sleep3  ---  3  ---  5
 * 说明nextTick将事件放在执行栈头部，而setTimeout在尾部
 */
function t14(){
    var a=1;
    var b=a+1;
    setTimeout(function(){
        console.log("init by setTimeout 0")
    },0);
    setTimeout(function(){
        console.log("5");
    },5000);
    setTimeout(function(){
        console.log("sleep 3");
        sleep(3000)
    },3000);
    setTimeout(function(){
        console.log("3");
    },3000);
    process.nextTick(function(){
        console.log("init by nextTick")
    });
    function sleep(t){
        var time=process.uptime();
        while(process.uptime()-time<t/1000){

        }
    }
}
/**
 * pid 进程id
 * platform 操作系统平台信息
 * release 当前node发布信息
 * title 在ps中显示的进程名字
 * version node版本
 * versions 一个node版本和它依赖项目版本的集合
 * process.umask([mask]) 设置或获取node进程创建文件和文件夹的权限，如果是设置操作,将返回原先的mask,如果是读取,返回当前的mask.
 * process.uptime()() nodejs进程已经运行的时间(s)
 */
function t15(){
    console.log('This process is pid ' + process.pid);
    //What platform you're running on: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
    console.log('This platform is ' + process.platform);
    console.log(process.release);
    console.log(process.title);
    console.log(process.version);
    console.log(process.versions);
    //process.umask(0022);
    var t=process.uptime();

}

/**
 * process.send 如果nodejs是在有IPC通道的情况下启动，可以通过process.send向其父进程发送消息
 * 父进程中 'message' 事件会响应消息
 */
function t16(){
    //用法见下面child_process部分
}

/**
 * process.stdin/stdout  系统I/O 输入输出
 * process.stderr 一个指向错误的输出流，对该流的写入是阻塞的
 */
function t17(){
    process.stdin.resume();//默认是暂停的，此方法开始接收
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function (chunk) {
        process.stdout.write('data: ' + chunk);
    });

    process.stdin.on('end', function () {
        process.stdout.write('end');
    });
    console.log = function(d) {
        process.stdout.write(d + '\n');
    };
    //可以用来与其他进程的通信
    var fs = require('fs');
    var zlib = require('zlib');

    fs.createReadStream('wow.txt')
        .pipe(zlib.createGzip())
        .pipe(process.stdout);
}
/*********************************************************
 *            下面是child_process的文档部分                 *
 *********************************************************/
/*
 ChildProcess对象不能直接new出来，通过spawn(), exec(), execFile(), or fork() 四个方法返回

 */

/**
 * 子进程相关事件
 * close
 * disconnect
 * error
 * exit
 * message
 */
function t18(){

}

/**
 * child.disconnect()  child.disconnected
 * TODO demo
 */
function t19(){

}
/**
 * child.send(message[, sendHandle][, callback])
 * {cmd: 'NODE_xxx'} 如果消息对象里边有以cmd为key，NODE_为value前缀的消息，则不会触发message事件，因为这种消息是node内核自己使用的
 *                    会触发internalMessage事件
 * sendHandle参数用来发送一个socket对象到子进程。子进程可以在message事件中获取此socket对象
 * callback在消息成功发送时无参数，失败时得到一个Error对象
 * child.send方法若成功发送消息则返回true，若消息通道已经关闭或者缓存未发送的消息达到阈值，则返回false
 */
function t20(){
    var cp = require('child_process');
    var n = cp.fork(__dirname + '/child.js');
    n.on('message', function(m) {
        console.log('PARENT got message:', m);
    });
    n.send({ hello: 'world' });
}

/**
 * child.send 发送一个server socket对象到子进程
 * 此时主线程和子线程同时处理请求
 */
function t21(){
    var child = require('child_process').fork('child2.js');
    // Open up the server object and send the handle.
    var server = require('net').createServer();
    server.on('connection', function (socket) {
        socket.end('handled by parent');
    });
    server.listen(1337, function() {
        child.send('server', server);
    });
}

/**
 * child.stdio,一个数组，里边存放着子进程的io对象，受创建进程时options.stdio配置影响
 * 具体配置见下面的child_process.spawn
 * 下面的demo中仅child.stdout存在
 */
function t22(){
    var assert = require('assert');
    var fs = require('fs');
    var child_process = require('child_process');
    child = child_process.spawn('node',["child3.js"], {
        stdio: [
            0, // 子进程使用父进程的stdin
            'pipe', //
            fs.openSync('err.out', 'w') // direct child's stderr to a file
        ]
    });
    child.stdout.setEncoding("utf8")
    child.stdout.on("data",function(data){
        console.log("=== child process on data ===",data)
    })
    //仅仅child.stdout存在，child.stdin和stderr都是null
    assert.equal(child.stdio[0], null);
    assert.equal(child.stdio[0], child.stdin);
    assert(child.stdout);
    assert.equal(child.stdio[1], child.stdout);
    assert.equal(child.stdio[2], null);
    assert.equal(child.stdio[2], child.stderr);
}

/**
 * child_process.exec(command[, options], callback)
 * 参数分别是：命令字符，命令执行环境配置对象，回调函数，回调函数提供err对象,stdout buffer,stderr buffer
 * ！！！注意，这里的stdio和子进程对象的stdout/in/err属性不同，是buffer，子进程对象的属性是stream
 * child_process.execFile(file[, args][, options][, callback])
 * 和child_process.exec大致相同，第二个参数args是一个数组，里边是执行参数
 */
function t23(){
    var exec = require('child_process').exec;
    var exec2 = require('child_process').execFile;
    var child=exec("ipconfig",function(err,stdout,stderr){
        console.log("exec",stdout.toString("utf8"))
    })
    var child2=exec2("cmdfile.cmd",function(err,stdout,stderr){
        console.log("exec2",stdout.toString("utf8"))
    })

}

/**
 * child_process.spawn(command[, args][, options])
 * child_process.spawnSync(command[, args][, options]) 同步方法，返回一个object，包括子进程的stdio数组等
 * command 要执行的命令，例如 node
 * args 执行参数  如  xxx.js
 * options 执行选项：
 * --cwd 字符串，执行路径
 * --env 对象，执行环境参数
 * --stdio 数组或字符串，进程标准io设置：
 * ---- 'pipe'  如果不填stdio，默认是pipe  相当于 ['pipe', 'pipe', 'pipe']，stdin,stdout,stderr均pipe到父进程中，在父进程中可以通过child.stdin/put/err 来访问
 * ---- 'ignore' - 相当于['ignore', 'ignore', 'ignore'] 都是null
 * ---- 'inherit' - 相当于[process.stdin, process.stdout, process.stderr] or [0,1,2] 继承，直接使用父进程的stdio
 * ---- *数组中有'ipc'时，会在子进程和父进程之间开启ipc通道通信，此时可以通过child.send给子进程发消息，子进程中也可以监听message消息
 * ---- *数组中的取值可能为：pipe、ignore、ipc、一个Stream、一个正整数（fs.openSync返回的一个文件描述符）、null/undefined
 */
function t24(){
    var child_process=require('child_process');
    var child=child_process.spawn("ipconfig",{
        stdio:'inherit' //此时用pipe或者ignore就不会在控制台中输出ipconfig的结果，用inherit会输出
    })
}
function t25(){
    var spawn=require("child_process").spawn;
    var c1=spawn("ipconfig");
    var c2=spawn("ipconfig",{
        stdio:"pipe"
    });
    var c3=spawn("ipconfig",{
        stdio:"ignore"
    });
    var c4=spawn("ipconfig",{
        stdio:"inherit"
    });
    //console.log(c1.stdin); // 一个可写流
    //console.log(c2.stdin); // 一个可写流
    //console.log(c3.stdin); // null
    //console.log(c4.stdin); // null c4直接使用父进程的stdout，会在控制台中输出ipcofig的数据
}
// 这两种写法都是可以的
function t26(){
    var spawn=require("child_process").spawn;
    var netstat=spawn("netstat",["-aon"],{
        stdio:["ignore","pipe","pipe"]
    });
    var findstr=spawn("findstr",["8080"],{
        stdio:["pipe","pipe","pipe"]
    });
    //netstat.stdout.on("data",function(data){
    //    console.log("netstat",data)
    //    findstr.stdin.write(data);
    //});
    //netstat.stdout.on("end",function(){
    //    findstr.stdin.end();
    //});
    //findstr.stdout.on("data",function(data){
    //    console.log("findstr",data)
    //});
    netstat.stdout.pipe(findstr.stdin);
    findstr.stdout.pipe(process.stdout);
}

/**
 * options.detached 让子线程可以独立在父线程之外长时间运行
 * child.unref(); 让父线程退出的时候不等待此子线程
 * TODO 这个demo没懂
 */
function t27(){
    var fs = require('fs'),
        spawn = require('child_process').spawn,
        out = fs.openSync('./out.log', 'a'),
        err = fs.openSync('./out.log', 'a');

    var child = spawn('ls', [], {
        detached: true,
        stdio: [ 'ignore', out, err ]
    });

    child.unref();
}

t22();
