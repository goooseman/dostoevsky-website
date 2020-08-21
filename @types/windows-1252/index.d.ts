declare module "windows-1252" {
  type options = {
    mode: "fatal" | "html";
  };
  const encode: (input: string, options?: options) => string;
  const decode: (input: string, options?: options) => string;
  const labels: string[];
  const version: string;
  export = {
    encode,
  };
}
