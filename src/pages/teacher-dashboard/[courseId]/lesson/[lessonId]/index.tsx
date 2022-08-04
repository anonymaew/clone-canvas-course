import { trpc } from "../../../../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import {
  isStudentEnrolled,
  isTeacherEnrolled,
} from "../../../../../utils/permission";
import { lessonUpdateType } from "../../../../../schema/lesson";
import { useForm } from "react-hook-form";

export default () => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const lessonId = router.query.lessonId as string;
  const { data: session, status } = useSession();
  const { data: lessonData, isLoading } = trpc.useQuery([
    "lesson.read.one",
    lessonId,
  ]);
  const {
    mutate: updateLesson,
    isLoading: updating,
    error: errorUpdatingLesson,
  } = trpc.useMutation(["lesson.update"], {
    onSuccess: () => router.reload(),
  });
  const { handleSubmit, register } = useForm<lessonUpdateType>();
  const handleUpdate = (values: lessonUpdateType) =>
    updateLesson({
      ...values,
      id: lessonId,
    });

  if (isLoading || !lessonData) {
    return <p>Loading...</p>;
  }

  if (status !== "loading" && !session) {
    router.push("/login");
  }

  return (
    <div>
      <div>
        <h1>{lessonData.title}</h1>
        <p>{lessonData.content}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            defaultValue={lessonData.title}
            {...register("title")}
          />
          <label htmlFor="published">Published</label>
          <input
            type="checkbox"
            id="published"
            defaultChecked={lessonData.published}
            {...register("published")}
          />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            defaultValue={lessonData.content}
            {...register("content")}
          />
          {errorUpdatingLesson && <p>{errorUpdatingLesson.message}</p>}
          <button type="submit" disabled={updating}>
            save
          </button>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const checkTeacherEnrolled = await isTeacherEnrolled(ctx, true);
  return checkTeacherEnrolled;
};
