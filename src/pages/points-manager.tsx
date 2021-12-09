import { Role } from ".prisma/client";
import Head from "next/head";
import React from "react";
import { PointsView } from "../apps/points-manager/views/manager";
import { withUser } from "../helpers/withUser";
import { withApollo } from "../lib/apollo-client";

const PointsManager: React.FC = () => {
  return (
    <>
      <Head>
        <title>TechCodes | Points Manager</title>
      </Head>
      <PointsView />
    </>
  );
};

export const getServerSideProps = withUser(async ({ user }) => {
  if (!user) return { redirect: { destination: "/", permanent: false } };
  if (user.role !== Role.EXEC)
    return { redirect: { destination: "/dashboard", permanent: false } };

  return { props: {} };
});

export default withApollo({ ssr: false })(PointsManager);
