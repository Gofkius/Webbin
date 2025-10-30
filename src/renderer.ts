/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite',
);

declare global {
  interface Window {
    electronAPI: {
      showAlert: (type: 'info' | 'warning' | 'error' | 'question', message: string) => void;
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = [
    { id: 'info-alert', type: 'info', msg: 'This is an info message!' },
    { id: 'warning-alert', type: 'warning', msg: 'This is a warning message!' },
    { id: 'error-alert', type: 'error', msg: 'Something went wrong!' },
    { id: 'question-alert', type: 'question', msg: 'Are you sure you want to continue?' },
  ] as const;

  for (const { id, type, msg } of buttons) {
    const btn = document.getElementById(id);
    btn?.addEventListener('click', () => window.electronAPI.showAlert(type, msg));
  }
});

