import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { RegisterView } from "../../apps/auth/views/register";
import { withUser } from "../../helpers/withUser";
import { withApollo } from "../../lib/apollo-client";
import { UserPageProps } from "../../types/UserProp";

const Register: NextPage<UserPageProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>TechCodes | Register</title>
      </Head>
      <RegisterView user={user} />
    </>
  );
};

export const getServerSideProps = withUser(async ({ user, context }) => {
  if (!user.osis) return { props: { user: user } };
  return {
    redirect: {
      destination: context.query.callback || "/dashboard",
      permanent: false,
    },
  };
});

export default withApollo({ ssr: false })(Register);
