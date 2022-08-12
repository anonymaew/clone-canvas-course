import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import BlogPageForm from '../../../../../components/blog/BlogPageForm';
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
  const handleSubmit = (title: string, content: string) => {
    if (lessonData)
      updateLesson({
        ...lessonData,
        title,
        content,
        id: lessonId,
      });
  };

  return (
    <BlogPageForm
      data={lessonData}
      loading={lessonLoading || checkLoading || status === "loading"}
      enrollLink={`/teacher-dashboard/`}
      enrolled={enrolled !== undefined && enrolled.length !== 0}
      handleUpdate={handleSubmit}
    />
  );
};

export default LessonPage;
