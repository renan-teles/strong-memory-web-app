declare global {
  interface Window {
    __env: any;
  }
}

export const environment = {
  production: false,

  /*
   * usa proxy Angular
   */
  apiUrl: '/api',
};
