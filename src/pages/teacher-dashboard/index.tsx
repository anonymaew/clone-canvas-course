import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import BlogList from '../../components/blog/BlogList';
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
  const { handleSubmit, register } = useForm<courseCreateType>();
  const handleCreate = (values: courseCreateType) => createCourse(values);

  return (
    <>
      <h1>Courses</h1>
      <form onSubmit={handleSubmit(handleCreate)}>
        <label htmlFor="courseName">course name:</label>
        <input
          type="text"
          id="courseName"
          placeholder="title"
          {...register("title")}
        />
        {errorCreateCourse && <p>{errorCreateCourse.message}</p>}
        <button type="submit" disabled={creating}>
          create a new course
        </button>
      </form>
      <BlogList
        data={courseListData}
        loading={readingCourse || checkLoading}
        enrollLink={`/`}
        enrolled={isTeacher !== undefined && isTeacher.length !== 0}
      />
    </>
  );
};

export default CourseList;
