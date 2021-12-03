import { Role } from ".prisma/client";
import React from "react";
import { EmailsView } from "../apps/email-maker/views/manager";
import { withUser } from "../helpers/withUser";

const EmailMaker: React.FC = () => {
    return <EmailsView />;
};

export const getServerSideProps = withUser(async ({ user }) => {
    if (!user) return { redirect: { destination: "/", permanent: false } };
    if (user.role !== Role.EXEC)
        return { redirect: { destination: "/dashboard", permanent: false } };

    return { props: {} };
});

export default EmailMaker;
