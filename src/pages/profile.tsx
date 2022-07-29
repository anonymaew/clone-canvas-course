import { trpc } from "../utils/trpc";

export default () => {
  const { data, isLoading } = trpc.useQuery(["profile.all"]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {`List ${data?.length} users:\n`}
      {data?.map(({ email, name }, index) => (
        <div key={index}>
          <p>{email}</p>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};
