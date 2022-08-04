import { GetServerSidePropsContext } from "next";
import { isStudentEnrolled } from "../../../utils/permission";
import { trpc } from "../../../utils/trpc";
import { useForm } from "react-hook-form";
import { paymentCreateType } from "../../../schema/payment";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const { data, isLoading } = trpc.useQuery(["payment.read.mine"]);
  const { handleSubmit, register } = useForm<paymentCreateType>();
  const {
    mutate,
    isLoading: submitting,
    error,
  } = trpc.useMutation(["payment.create"], {
    onSuccess: () => router.reload(),
  });

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>Something wrong</p>;

  const thisPayment = data.filter(
    (payment) => payment.courseId === courseId && payment.status != "REJECTED"
  )[0];

  const handleCreate = (values: paymentCreateType) => {
    mutate({ ...values, courseId: courseId, amount: "0" });
  };
  if (!thisPayment)
    return (
      <form onSubmit={handleSubmit(handleCreate)}>
        <input type="text" placeholder="image url" {...register("image")} />
        <p>{error && error.message}</p>
        <button type="submit" disabled={submitting}>
          Submit slip payment
        </button>
      </form>
    );

  if (thisPayment.status === "PENDING")
    return <p>Your enrollment is waiting for a validation</p>;

  return <p>You are already enrolled</p>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const checkStudentEnrolled = await isStudentEnrolled(ctx, false);
  return checkStudentEnrolled;
};
