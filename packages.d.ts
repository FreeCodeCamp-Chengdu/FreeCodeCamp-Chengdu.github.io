declare module '*.less' {
  const map: Record<string, string>;

  export default map;
}

declare module '@editorjs/*' {
  const Plugin: import('@editorjs/editorjs').ToolConstructable;

  export default Plugin;
}
