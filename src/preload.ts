// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  showAlert: (type: 'info' | 'warning' | 'error' | 'question', message: string) =>
    ipcRenderer.send('show-alert', { type, message }),
  openNewWindow: () => ipcRenderer.send('open-new-window'),
});