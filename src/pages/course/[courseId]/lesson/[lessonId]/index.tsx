import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import BlogPage from '../../../../../components/blog/BlogPage';
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
  const { data: enrolled, isLoading: checkLoading } = trpc.useQuery([
    "check.study",
    courseId,
  ]);

  return (
    <BlogPage
      data={lessonData}
      loading={lessonLoading || checkLoading || status === "loading"}
      enrollLink={`${courseId}/enroll`}
      enrolled={enrolled !== undefined && enrolled.length !== 0}
    />
  );
};

export default LessonPage;
