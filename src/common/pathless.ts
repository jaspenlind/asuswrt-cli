export default (filePath: string): string => (filePath || "").split("/").pop();
