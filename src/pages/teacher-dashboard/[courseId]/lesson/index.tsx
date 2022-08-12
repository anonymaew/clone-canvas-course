import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import BlogListForm from '../../../../components/blog/BlogListForm';
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
              id: lesson.id,
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
  const {
    mutate: deleteLesson,
    isLoading: deleting,
    error: errorDeleting,
  } = trpc.useMutation(["lesson.delete"], {
    onSuccess: () => router.reload(),
  });
  const { data: enrolled, isLoading: checkLoading } = trpc.useQuery([
    "check.teach",
    courseId,
  ]);

  const handleCreate = (title: string) => {
    createLesson({ title, courseId });
  };
  const handleDelete = (id: string) => {
    deleteLesson(id);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-violet-500">
        Lessons
      </h1>
      <BlogListForm
        data={lessonListData}
        loading={lessonLoading || checkLoading || status === "loading"}
        enrollLink={`/teacher-dashboard/`}
        enrolled={enrolled !== undefined && enrolled.length !== 0}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default LessonList;
