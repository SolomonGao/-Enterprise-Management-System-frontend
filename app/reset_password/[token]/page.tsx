import ResetPassword from "@/app/components/Auth/PostResetPassword";
import { Box } from "@mui/material";

// Fetch the token from the context in getServerSideProps
export async function getServerSideProps({ params }: { params: { token: string } }) {
  const { token } = params; // Extract the token from URL params

  // Return the token as a prop
  return {
    props: {
      token,
    },
  };
}

export default function ResetPasswordPage({ token }: { token: string }) {
  console.log(token); // Token will now be correctly passed as a prop

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <Box className="flex items-center justify-center w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <ResetPassword token={token} />
      </Box>
    </div>
  );
}