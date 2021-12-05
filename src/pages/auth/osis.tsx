import { RegisterView } from "../../apps/auth/views/register";
import { withUser } from "../../helpers/withUser";
import { withApollo } from "../../lib/apollo-client";

export const getServerSideProps = withUser(async ({ user, context }) => {
  if (!user.osis) return { props: { user: user } };
  return {
    redirect: {
      destination: context.query.callback || "/dashboard",
      permanent: false,
    },
  };
});

export default withApollo({ ssr: false })(RegisterView);
