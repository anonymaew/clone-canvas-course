import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import BlogList from '../../components/blog/BlogList';
import BlogListForm from '../../components/blog/BlogListForm';
import { courseCreateType } from '../../schema/course';
import { trpc } from '../../utils/trpc';

const CourseList = () => {
  const router = useRouter();
  const { data, isLoading: readingCourse } = trpc.useQuery([
    "course.read.teach.many",
  ]);
  const courseListData = {
    list:
      data?.map((course) => {
        return {
          id: course.id,
          title: course.title,
          created: course.created,
          updated: course.updated,
          link: `/teacher-dashboard/${course.id}`,
        };
      }) || [],
  };
  const {
    mutate: createCourse,
    isLoading: creating,
    error: errorCreateCourse,
  } = trpc.useMutation(["course.create"], {
    onSuccess: () => router.reload(),
  });
  const {
    mutate: deleteCourse,
    isLoading: deleting,
    error: errorDeleting,
  } = trpc.useMutation(["course.delete"], {
    onSuccess: () => router.reload(),
  });
  const { data: isTeacher, isLoading: checkLoading } = trpc.useQuery([
    "check.teacher",
  ]);

  const handleCreate = (title: string) => {
    createCourse({ title });
  };
  const handleDelete = (id: string) => {
    deleteCourse(id);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-violet-500">
        Courses
      </h1>
      <BlogListForm
        data={courseListData}
        loading={readingCourse || checkLoading}
        enrollLink={`/`}
        enrolled={isTeacher !== undefined && isTeacher.length !== 0}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default CourseList;
