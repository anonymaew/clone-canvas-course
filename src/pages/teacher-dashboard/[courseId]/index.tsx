import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import BlogPage from '../../../components/blog/BlogPage';
import { courseUpdateType } from '../../../schema/course';
import { trpc } from '../../../utils/trpc';

const CoursePage = (props: { enrolled: boolean }) => {
  const router = useRouter();
  const { status } = useSession();
  const courseId = router.query.courseId as string;
  const { data, isLoading: courseLoading } = trpc.useQuery([
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
  const { handleSubmit, register } = useForm<courseUpdateType>();
  const handleUpdate = (values: courseUpdateType) =>
    updateCourse({
      ...values,
      price: validationRef.current?.checked ? values.price : null,
      id: courseId,
    });
  const validationRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div>
        {data && (
          <form onSubmit={handleSubmit(handleUpdate)}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              defaultValue={data.title}
              {...register("title")}
            />
            <label htmlFor="validation">Require validation</label>
            <input
              type="checkbox"
              id="validation"
              defaultChecked={data.price !== null}
              ref={validationRef}
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              defaultValue={data.price || 0}
              {...register("price")}
            />
            <label htmlFor="published">Published</label>
            <input
              type="checkbox"
              id="published"
              defaultChecked={data.published}
              {...register("published")}
            />
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              defaultValue={data.content}
              {...register("content")}
            />
            {errorUpdatingCourse && <p>{errorUpdatingCourse.message}</p>}
            <button type="submit" disabled={updating}>
              save
            </button>
          </form>
        )}
        <BlogPage
          data={data}
          loading={courseLoading || checkLoading || status === "loading"}
          enrollLink={`/teacher-dashboard`}
          enrolled={enrolled !== undefined && enrolled.length !== 0}
        />
      </div>
    </div>
  );
};

export default CoursePage;
