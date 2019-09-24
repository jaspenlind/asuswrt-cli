export default interface CommandDeclaration {
  description?: string;
  helpName?: string;
  run?: (...args: string[]) => any;
}
