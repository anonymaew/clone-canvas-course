import { trpc } from "../../../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { lessonCreateType } from "../../../../schema/lesson";

export default () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<lessonCreateType>();
  const courseId = router.query.courseId as string;
  const { data: session, status } = useSession();
  const {
    mutate,
    isLoading: submitting,
    error,
  } = trpc.useMutation(["lesson.create"], {
    onSuccess: () => router.reload(),
  });
  const { data: lessonListData, isLoading } = trpc.useQuery([
    "lesson.read.in-course",
    courseId,
  ]);
  const lessonList =
    lessonListData?.map((lesson) => {
      return {
        header: lesson.title,
        url: `/teacher-dashboard/${courseId}/lesson/${lesson.id}`,
      };
    }) || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (status !== "loading" && !session) {
    router.push("/login");
  }

  const handleCreate = (values: lessonCreateType) => {
    mutate({ ...values, courseId });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(handleCreate)}>
          <input type="text" placeholder="title" {...register("title")} />
          <button type="submit" disabled={submitting}>
            Create
          </button>
        </form>
        <p>{error && error.message}</p>
      </div>
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
