import sh from "shelljs";
import { ConfigCreationData } from "../../../types";

export const addToSshAgent = (data: ConfigCreationData): void => {
  if (!data.addKeyToAgent) return;

  sh.exec("ssh-add");
};
