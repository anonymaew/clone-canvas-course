import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { courseCreateType } from "../../schema/course";

export default () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<courseCreateType>();
  const { data: session, status } = useSession();
  const {
    mutate,
    isLoading: submitting,
    error,
  } = trpc.useMutation(["course.create"], {
    onSuccess: () => router.reload(),
  });
  const { data: courseListData, isLoading } = trpc.useQuery([
    "course.read.teach.many",
  ]);
  const courseList =
    courseListData?.map((course) => {
      return {
        header: course.title,
        url: `/teacher-dashboard/${course.id}`,
      };
    }) || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // if (status !== "loading" && !session) {
  //   router.push("/login");
  // }

  const handleCreate = (values: courseCreateType) => {
    mutate(values);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(handleCreate)}>
          <input type="text" placeholder="title" {...register("title")} />
          <button type="submit" disabled={submitting}>
            Create
          </button>
        </form>
        <p>{error && error.message}</p>
      </div>
      <div>
        <h1>Courses</h1>
        {courseList.length === 0 ? (
          <p>No items</p>
        ) : (
          <ul>
            {courseList.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.url}>
                    <a>{item.header}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
