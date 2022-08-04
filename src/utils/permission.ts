import { GetServerSidePropsContext } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { prisma } from "../server/db/client";

export const isLoggedIn = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session || !session.user || !session.user.id)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {},
    };

  return {
    props: {
      userId: session.user.id,
    },
  };
};

export const isStudentEnrolled = async (
  ctx: GetServerSidePropsContext,
  redirect: boolean
) => {
  const checkLogin = await isLoggedIn(ctx);
  if (checkLogin.redirect) return checkLogin;

  const courseId = ctx.query.courseId as string;
  const course = await prisma.studentEnrollment.findMany({
    where: {
      courseId: courseId,
      studentId: checkLogin.props.userId,
    },
  });

  if (course.length === 0) {
    if (redirect)
      return {
        redirect: {
          destination: `/course/${courseId}/enroll`,
          permanent: false,
        },
        props: { enrolled: false },
      };
    return {
      redirect: false,
      props: { enrolled: false },
    };
  }

  return {
    redirect: false,
    props: { enrolled: true },
  };
};

export const isTeacherEnrolled = async (
  ctx: GetServerSidePropsContext,
  redirect: boolean
) => {
  const checkLogin = await isLoggedIn(ctx);
  if (checkLogin.redirect) return checkLogin;

  const courseId = ctx.query.courseId as string;
  const course = await prisma.teacherEnrollment.findMany({
    where: {
      courseId: courseId,
      teacherId: checkLogin.props.userId,
    },
  });

  if (course.length === 0) {
    if (redirect)
      return {
        redirect: {
          destination: `/teacher-dashboard`,
          permanent: false,
        },
        props: { enrolled: false },
      };
    return {
      redirect: false,
      props: { enrolled: false },
    };
  }

  return {
    redirect: false,
    props: { enrolled: true },
  };
};
