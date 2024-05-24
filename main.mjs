import isDev from 'electron-is-dev';
import { app, BrowserWindow } from 'electron';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
    });

    if (isDev) {
        // 開發階段直接與 React 連線
        mainWindow.loadURL('http://localhost:3000/');
        // 開啟 DevTools.
        mainWindow.webContents.openDevTools();
    } else {
        // 產品階段直接讀取 React 打包好的
        mainWindow.loadFile('./build/index.html');
    }
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
