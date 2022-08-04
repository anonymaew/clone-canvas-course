import { trpc } from "../../../../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default () => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const lessonId = router.query.lessonId as string;
  const { data: session, status } = useSession();
  const { data: lessonData, isLoading } = trpc.useQuery([
    "lesson.read.one",
    lessonId,
  ]);

  if (isLoading || !lessonData) {
    return <p>Loading...</p>;
  }

  if (status !== "loading" && !session) {
    router.push("/login");
  }

  return (
    <div>
      <div>
        <h1>{lessonData.title || "Untitled"}</h1>
        <p>
          {lessonData.content || "Instructors have not put any content yet."}
        </p>
      </div>
    </div>
  );
};
