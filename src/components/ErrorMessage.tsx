export const ErrorMessage = <T extends Error>({ error }: { error?: T | null }) => {
  //todo: replace with nice spinner and stuff
  if (error) {
    return <div>{error.message}</div>;
  }

  return null;
};
