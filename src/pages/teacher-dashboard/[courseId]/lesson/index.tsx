import { trpc } from "../../../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { isTeacherEnrolled } from "../../../../utils/permission";
import { lessonCreateType } from "../../../../schema/lesson";
import { useForm } from "react-hook-form";

export default () => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const { data: lessonListData, isLoading } = trpc.useQuery([
    "lesson.read.in-course",
    courseId,
  ]);
  const {
    mutate: createLesson,
    isLoading: creating,
    error: errorCreateLesson,
  } = trpc.useMutation(["lesson.create"], {
    onSuccess: () => router.reload(),
  });
  const { handleSubmit, register } = useForm<lessonCreateType>();
  const handleCreate = (values: lessonCreateType) =>
    createLesson({ ...values, courseId });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!lessonListData) return <p>Something wrong</p>;

  return (
    <div>
      <div>
        <h1>Lessons</h1>
        <form onSubmit={handleSubmit(handleCreate)}>
          <label htmlFor="lessonName">lesson name:</label>
          <input
            type="text"
            id="lessonName"
            placeholder="title"
            {...register("title")}
          />
          {errorCreateLesson && <p>{errorCreateLesson.message}</p>}
          <button type="submit" disabled={creating}>
            create a new lesson
          </button>
        </form>
        {lessonListData.length === 0 ? (
          <p>No items</p>
        ) : (
          <ul>
            {lessonListData.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    href={`/teacher-dashboard/${courseId}/lesson/${item.id}`}
                  >
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
  const checkTeacherEnrolled = await isTeacherEnrolled(ctx, true);
  return checkTeacherEnrolled;
};
