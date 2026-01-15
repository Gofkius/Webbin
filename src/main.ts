import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

// 1. Define the Helper Function Correctly
const createHelpWindow = () => {
  const helpWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Help',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Note: Using 'about' because your App.tsx has <Route path="/about" ... />
  // If you want 'manual', you must change App.tsx first.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    helpWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#/manual`);
  } else {
    helpWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      { hash: 'manual' }
    );
  }
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'Webbin',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // 2. Define the Menu inside createWindow
  const template: any[] = [
    // macOS App Menu (Keep this so Cmd+Q works)
    ...(process.platform === 'darwin'
      ? [{
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }]
      : []),

    // The Help Menu
    {
      role: 'help',
      submenu: [
        {
          label: 'Open Manual',
          accelerator: 'F1',
          click: () => createHelpWindow() // Calls the helper function
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// 3. Clean up the IPC handler
ipcMain.on('open-new-window', () => {
  createHelpWindow();
});

ipcMain.on('show-alert', (_, { type, message }) => {
  if (!mainWindow) return;

  dialog.showMessageBox(mainWindow, {
    type, 
    title: type.charAt(0).toUpperCase() + type.slice(1),
    message,
    buttons: ['OK'],
  });
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});