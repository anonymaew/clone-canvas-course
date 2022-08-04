import { trpc } from "../../utils/trpc";
import { unstable_getServerSession as getServerSession } from "next-auth";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { isLoggedIn } from "../../utils/permission";

export default () => {
  const { data, isLoading } = trpc.useQuery(["course.read.study.many"]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <h1>Courses</h1>
        {data === undefined || data.length === 0 ? (
          <p>No items</p>
        ) : (
          <ul>
            {data.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={`/course/${item.id}`}>
                    <a>{item.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await isLoggedIn(ctx);
  return session;
};
