import { trpc } from "../../utils/trpc";
import { unstable_getServerSession as getServerSession } from "next-auth";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { isLoggedIn } from "../../utils/permission";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { courseCreateType } from "../../schema/course";

const CourseList = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery(["course.read.teach.many"]);
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
  const { handleSubmit, register } = useForm<courseCreateType>();
  const handleCreate = (values: courseCreateType) => createCourse(values);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
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
        {data === undefined || data.length === 0 ? (
          <p>No items</p>
        ) : (
          <ul>
            {data.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={`/teacher-dashboard/${item.id}`}>
                    <a>{item.title}</a>
                  </Link>
                  <button onClick={() => deleteCourse(item.id)}>delete</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseList;
