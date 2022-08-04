import { trpc } from "../../../utils/trpc";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { isTeacherEnrolled } from "../../../utils/permission";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { courseUpdateType } from "../../../schema/course";
import { useEffect, useRef, useState } from "react";

export default (props: { enrolled: boolean }) => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const { data, isLoading } = trpc.useQuery([
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
  const { handleSubmit, register } = useForm<courseUpdateType>();
  const handleUpdate = (values: courseUpdateType) =>
    updateCourse({
      ...values,
      price: validationRef.current?.checked ? values.price : null,
      id: courseId,
    });
  const validationRef = useRef<HTMLInputElement>(null);

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>something wrong</p>;

  return (
    <div>
      <div>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
        {!props.enrolled && (
          <Link href={`/course/${courseId}/enroll`}>
            <button>Click to enroll</button>
          </Link>
        )}
      </div>
      <div>
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
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const checkTeacherEnrolled = await isTeacherEnrolled(ctx, false);
  return checkTeacherEnrolled;
};
