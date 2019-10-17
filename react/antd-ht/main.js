const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win
let newwin;

ipc.on('add',()=>{
    newwin = new BrowserWindow({
        width: 600, 
        height: 400,
        frame:false,
        parent: win, //win是主窗口
    })
    newwin.loadURL('http://localhost:5888/login?info=afdG9rZW4lM0RiNGVhYjNiOC0xMTk5LTRmYzYtODAxMC0yNWRiMTcyNGM2ZmElMjZwaWQlM0QyMCUyNmFwcGlkJTNENjg2JTI2bmFtZSUzRCVFNiVCNSU4QiVFOCVBRiU5NSUyNnByb2plY3RuYW1lJTNEJUU2JUI1JThCJUU4JUFGJTk1JTI2cHJvamVjdF9pZCUzRDIwJTI2YXBwX2lkJTNEdGVzdDAwMQ=='); //new.html是新开窗口的渲染进程
    newwin.on('closed',()=>{newwin = null})
})

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({ 
        width: 1200, 
        height: 800, 
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 然后加载应用的 index.html。  url 及本地文件形式
    win.loadURL('http://localhost:3000')
    // win.loadFile('public/index.html')
    //如果想要让electron加载本地打包好的React文件的build文件下的内容是这样子的：
    // win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)  
    // https://blog.csdn.net/zoepriselife316/article/details/88031218
    
    // 打开开发者工具
    win.webContents.openDevTools()
  
    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。