import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { prependOnceListener } from 'process';

import BlogPage from '../../../components/blog/BlogPage';
import Navbar from '../../../components/blog/Navbar';
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
    <Navbar
      course={
        courseData
          ? { name: courseData.blogHeader.title, id: courseId }
          : undefined
      }
    >
      <BlogPage
        data={courseData}
        loading={courseLoading || checkLoading || status === "loading"}
        enrollLink={`${courseId}/enroll`}
        enrolled={enrolled !== undefined && enrolled.length !== 0}
      />
    </Navbar>
  );
};

export default CoursePage;
