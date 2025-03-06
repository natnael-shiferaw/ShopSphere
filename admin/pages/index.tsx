import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div className="bg-gray-300 text-center font-bold text-3xl p-2">
        ShopSphere Admin panel
      </div>
      {/** checks for user's session */}
      {!session ? (
        <div className="bg-gray-50 w-screen h-screen flex items-center justify-center">
          <button
            className="p-2 px-4 bg-gray-300 rounded-lg hover:cursor-pointer"
            onClick={() => signIn("google")} // Sign in function
          >
            Login with Google
          </button>
        </div>
      ) : (
        <div className="text-center mt-4">
          Signed in as {session.user?.email ?? "Unknown user"}
          <button
            className="m-4 p-2 px-4 bg-gray-300 rounded-lg hover:cursor-pointer"
            onClick={() => signOut()} // Sign Out function
          >
            LogOut
          </button>
        </div>
      )}

    </>
  );
}
