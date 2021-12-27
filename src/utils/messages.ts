export const commitMessage = {
  success: "Moved files from staging area and created snapshot of changes.",
  error: "Couldn't move files from staging area to commit.",
  treeClean: "On branch main, working tree is clean.",
  treeCleanTrace: "On branch main, theres is nothing to commit.",
  noMessage: "No commit message provided.",
  emptyMessage: "Can't perform commit with empty message",
};

export const pushMessage = (remote?: string) => {
  return {
    invalid: `An empty string seems to be invalid remote name.`,
    nouse: `Either you do not have access to use '${remote}' remote repository or it does not exist.`,
    noRemoteGiven: "No remote is specified.",
    error: `Couldn't send the local commits to the ${remote} repository.`,
    success: `Sent the local commits to the ${remote} repository.`,
    remoteAddFail: `Couldn't add ${remote} remote to your local repository.`,
  };
};

export const commonMessage = {
  emptyString: "Your response seems to be an empty string which is not valid.",
};
