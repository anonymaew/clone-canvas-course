import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import BlogPage from '../../../../../components/blog/BlogPage';
import { lessonUpdateType } from '../../../../../schema/lesson';
import { trpc } from '../../../../../utils/trpc';

const LessonPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const courseId = router.query.courseId as string;
  const lessonId = router.query.lessonId as string;
  const { data: lessonData, isLoading: lessonLoading } = trpc.useQuery([
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
  const { data: enrolled, isLoading: checkLoading } = trpc.useQuery([
    "check.teach",
    courseId,
  ]);
  const { handleSubmit, register } = useForm<lessonUpdateType>();
  const handleUpdate = (values: lessonUpdateType) =>
    updateLesson({
      ...values,
      id: lessonId,
    });

  return (
    <div>
      <div>
        {lessonData && (
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
        )}
        <BlogPage
          data={lessonData}
          loading={lessonLoading || checkLoading || status === "loading"}
          enrollLink={`/teacher-dashboard/`}
          enrolled={enrolled !== undefined && enrolled.length !== 0}
        />
      </div>
    </div>
  );
};

export default LessonPage;
