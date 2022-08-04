import { trpc } from "../../../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { isStudentEnrolled } from "../../../../utils/permission";

export default () => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const { data: lessonListData, isLoading } = trpc.useQuery([
    "lesson.read.in-course",
    courseId,
  ]);
  const lessonList =
    lessonListData?.map((lesson) => {
      return {
        header: lesson.title,
        url: `/course/${courseId}/lesson/${lesson.id}`,
      };
    }) || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h1>Lessons</h1>
        {lessonList.length === 0 ? (
          <p>No items</p>
        ) : (
          <ul>
            {lessonList.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.url}>
                    <a>{item.header}</a>
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
  const checkStudentEnrolled = await isStudentEnrolled(ctx, true);
  return checkStudentEnrolled;
};
