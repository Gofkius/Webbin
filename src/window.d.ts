export interface IElectronAPI {
  showAlert: (type: 'info' | 'warning' | 'error' | 'question', message: string) => void;
  openNewWindow: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}