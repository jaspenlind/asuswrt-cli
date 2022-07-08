import sh from "shelljs";
import { ConfigCreationData } from "../../../types/index.mjs";

export const addToSshAgent = (data: ConfigCreationData): void => {
  if (!data.addKeyToAgent) return;

  sh.exec("ssh-add");
};

export default addToSshAgent;
