import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import BlogList from '../../../../components/blog/BlogList';
import { lessonCreateType } from '../../../../schema/lesson';
import { trpc } from '../../../../utils/trpc';

const LessonList = () => {
  const router = useRouter();
  const { status } = useSession();
  const courseId = router.query.courseId as string;
  const { data, isLoading: lessonLoading } = trpc.useQuery([
    "lesson.read.in-course",
    courseId,
  ]);
  const lessonListData = {
    list:
      data !== undefined
        ? data.map((lesson) => {
            return {
              title: lesson.title,
              created: lesson.created,
              updated: lesson.updated,
              link: `/teacher-dashboard/${courseId}/lesson/${lesson.id}`,
            };
          })
        : [],
  };
  const {
    mutate: createLesson,
    isLoading: creating,
    error: errorCreateLesson,
  } = trpc.useMutation(["lesson.create"], {
    onSuccess: () => router.reload(),
  });
  const { data: enrolled, isLoading: checkLoading } = trpc.useQuery([
    "check.teach",
    courseId,
  ]);

  const { handleSubmit, register } = useForm<lessonCreateType>();
  const handleCreate = (values: lessonCreateType) =>
    createLesson({ ...values, courseId });

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
        <BlogList
          data={lessonListData}
          loading={lessonLoading || checkLoading || status === "loading"}
          enrollLink={`/teacher-dashboard/`}
          enrolled={enrolled !== undefined && enrolled.length !== 0}
        />
      </div>
    </div>
  );
};
