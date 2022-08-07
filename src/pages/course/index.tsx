import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import BlogList from '../../components/blog/BlogList';
import { trpc } from '../../utils/trpc';

const LessonList = () => {
  const router = useRouter();
  const { status } = useSession();
  const { data, isLoading: courseLoading } = trpc.useQuery([
    "course.read.study.enroll",
  ]);
  const courseListData = {
    list:
      data?.map((course) => {
        return {
          id: course.id,
          title: course.title,
          created: course.created,
          updated: course.updated,
          link: `/course/${course.id}`,
        };
      }) || [],
  };

  return (
    <BlogList
      data={courseListData}
      loading={courseLoading || status === "loading"}
      enrollLink={`/`}
      enrolled={true}
    />
  );
};

export default LessonList;
