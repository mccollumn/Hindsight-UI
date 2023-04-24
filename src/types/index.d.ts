export {};

declare global {
  interface Window {
    config: {
      DX_ENDPOINT: string;
      A9_URL: string;
    };
  }
}
