import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import BlogPageForm from '../../../components/blog/BlogPageForm';
import { trpc } from '../../../utils/trpc';

const CoursePage = (props: { enrolled: boolean }) => {
  const router = useRouter();
  const { status } = useSession();
  const courseId = router.query.courseId as string;
  const { data: courseData, isLoading: courseLoading } = trpc.useQuery([
    "course.read.teach.one",
    courseId,
  ]);
  const {
    mutate: updateCourse,
    isLoading: updating,
    error: errorUpdatingCourse,
  } = trpc.useMutation(["course.update"], {
    onSuccess: () => router.reload(),
  });
  const { data: enrolled, isLoading: checkLoading } = trpc.useQuery([
    "check.teach",
    courseId,
  ]);
  const handleSubmit = (title: string, content: string) => {
    if (courseData)
      updateCourse({
        ...courseData,
        title,
        content,
        id: courseId,
      });
  };

  return (
    <BlogPageForm
      data={courseData}
      loading={courseLoading || checkLoading || status === "loading"}
      enrollLink={`/teacher-dashboard`}
      enrolled={enrolled !== undefined && enrolled.length !== 0}
      handleUpdate={handleSubmit}
    />
  );
};

export default CoursePage;
