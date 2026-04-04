declare global {
  interface Window {
    __env: any;
  }
}

export const environment = {
  production: false,
  apiUrl: window.__env?.API_URL || 'http://localhost:8080',
};
