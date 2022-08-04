import { trpc } from "../../../utils/trpc";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { isAdmin } from "../../../utils/permission";
import { useRouter } from "next/router";
import { courseUpdateType } from "../../../schema/course";
import { useEffect, useRef, useState } from "react";
import { paymentUpdateType } from "../../../schema/payment";

export default () => {
  const router = useRouter();
  const { data: paymentList, isLoading } = trpc.useQuery(["payment.read.many"]);
  const {
    mutate: updatePayment,
    isLoading: updating,
    error: errorUpdating,
  } = trpc.useMutation(["payment.update"], {
    onSuccess: () => router.reload(),
  });
  const handleUpdate = (paymentId: string, approve: boolean) =>
    updatePayment({
      id: paymentId,
      approvedUserId: "admin??",
      status: approve ? "APPROVED" : "REJECTED",
    });

  if (isLoading) return <p>Loading...</p>;

  if (!paymentList) return <p>something wrong</p>;

  return (
    <div>
      <h1>Payment List</h1>
      <ul>
        {paymentList.map((payment, index) => (
          <li key={index}>
            User:<span>{payment.userId}</span>
            Pays:<span>{payment.amount || "nothing"}</span>
            Slip <span>{payment.image}</span>
            At:<span>{new Date(payment.created).toLocaleString()}</span>
            Status:<span>{payment.status}</span>
            <button onClick={() => handleUpdate(payment.id, true)}>
              Approve
            </button>
            <button onClick={() => handleUpdate(payment.id, false)}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const checkAdmin = await isAdmin(ctx);
  return checkAdmin;
};
