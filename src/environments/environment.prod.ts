declare global {
  interface Window {
    __env: any;
  }
}

export const environment = {
  production: true,

  /*
   * valor injetado no deploy
   */
  apiUrl: window.__env?.API_URL || '/api',
};
