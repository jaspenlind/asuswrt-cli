export default (filePath: string): string =>
  ((filePath && filePath.split("/")) || []).pop() || "";
