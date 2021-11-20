import { Role } from ".prisma/client";
import { Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import ExecDashboard from "../components/ExecDashboard";
import { withUser } from "../helpers/withUser";
import { UserPageProps } from "../types/UserProp";

const Dashboard: React.FC<UserPageProps> = ({ user }) => {
  switch (user.role) {
    case Role.MEMBER:
      return <p>Hi peasant</p>;
    case Role.EXEC:
      return <ExecDashboard user={user} />;
  }
};

export const getServerSideProps = withUser(({ user }) => {
  console.log(user);
  if (!user) return { redirect: { destination: "/", permanent: false } };
  return { props: { user } };
});

export default Dashboard;
