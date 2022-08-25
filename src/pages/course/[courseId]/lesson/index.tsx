import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import BlogList from '../../../../components/blog/BlogList';
import Navbar from '../../../../components/blog/Navbar';
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
            };
          })
        : [],
  };
  const { data: enrolled, isLoading: checkLoading } = trpc.useQuery([
    "check.study",
    courseId,
  ]);

  return (
    <Navbar>
      <BlogList
        data={lessonListData}
        loading={lessonLoading || checkLoading || status === "loading"}
        enrollLink={`${courseId}/enroll`}
        enrolled={enrolled !== undefined && enrolled.length !== 0}
      />
    </Navbar>
  );
};

export default LessonList;
