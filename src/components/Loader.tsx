export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  //todo: replace with nice spinner and stuff
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
};
