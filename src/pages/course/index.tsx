import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import BlogList from '../../components/blog/BlogList';
import Navbar from '../../components/blog/Navbar';
import { trpc } from '../../utils/trpc';

const LessonList = () => {
  const router = useRouter();
  const { status } = useSession();
  const { data, isLoading: courseLoading } = trpc.useQuery([
    "course.read.study.enroll",
  ]);
  const [courseListData, setCourseListData] = useState<{
    list: {
      id: string;
      title: string;
      created: Date;
      updated: Date;
    }[];
  }>({ list: [] });
  useEffect(() => {
    if (!courseLoading && data !== undefined)
      setCourseListData({
        list: data.map((course) => {
          return {
            id: course.id,
            title: course.title,
            created: course.created,
            updated: course.updated,
          };
        }),
      });
  }, [courseLoading]);

  return (
    <Navbar>
      <>
        <h1 className="text-4xl font-bold text-center text-violet-500">
          Your courses
        </h1>
        <BlogList
          data={courseListData}
          loading={courseLoading || status === "loading"}
          enrollLink={`/`}
          enrolled={true}
        />
      </>
    </Navbar>
  );
};

export default LessonList;
