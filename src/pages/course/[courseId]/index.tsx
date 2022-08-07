import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import BlogPage from '../../../components/blog/BlogPage';
import { trpc } from '../../../utils/trpc';

const CoursePage = () => {
  const router = useRouter();
  const { status } = useSession();
  const courseId = router.query.courseId as string;
  const { data: courseData, isLoading: courseLoading } = trpc.useQuery([
    "course.read.study.one",
    courseId,
  ]);
  const { data: enrolled, isLoading: checkLoading } = trpc.useQuery([
    "check.study",
    courseId,
  ]);

  return (
    <BlogPage
      data={courseData}
      loading={courseLoading || checkLoading || status === "loading"}
      enrollLink={`${courseId}/enroll`}
      enrolled={enrolled !== undefined && enrolled.length !== 0}
    />
  );
};

export default CoursePage;
