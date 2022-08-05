import { trpc } from "../../../utils/trpc";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { isStudentEnrolled } from "../../../utils/permission";
import { useRouter } from "next/router";

const CoursePage = (props: { enrolled: boolean }) => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const { data, isLoading } = trpc.useQuery([
    "course.read.study.one",
    courseId,
  ]);

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
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const checkStudentEnrolled = await isStudentEnrolled(ctx, false);
  return checkStudentEnrolled;
};

export default CoursePage;
