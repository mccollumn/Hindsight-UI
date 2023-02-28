export {};

declare global {
  interface Window {
    config: {
      DX_SERVER: string;
      A9_URL: string;
    };
  }
}
