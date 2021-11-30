import { Role } from ".prisma/client";
import React from "react";
import { PointsView } from "../apps/points-manger/views/manager";
import { withUser } from "../helpers/withUser";

const PointsManager: React.FC = () => {
  return <PointsView />;
};

export const getServerSideProps = withUser(async ({ user }) => {
  if (!user) return { redirect: { destination: "/", permanent: false } };
  if (user.role !== Role.EXEC)
    return { redirect: { destination: "/dashboard", permanent: false } };

  return { props: {} };
});

export default PointsManager;
