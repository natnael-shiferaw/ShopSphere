import NavBar from "@/components/NavBar";
import { useSession, signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";

interface LayoutProps {
    children : ReactNode;
}

export default function Layout({children} : LayoutProps) {
  const { data: session } = useSession();

  return (
    <div className="flex">
      <NavBar />
      
      {/** checks for user's session */}
      {!session ? (
        <div className="bg-gray-50 w-screen h-screen flex items-center justify-center mr-2">
          <button
            className="p-2 px-4 bg-gray-300 rounded-lg hover:cursor-pointer"
            onClick={() => signIn("google")} // Sign in function
          >
            Login with Google
          </button>
        </div>
      ) : (
        <div className="text-center mr-2 ml-2 mt-4">
          Signed in as {session.user?.email ?? "Unknown user"}
          <button
            className="m-4 p-2 px-4 bg-gray-300 rounded-lg hover:cursor-pointer"
            onClick={() => signOut()} // Sign Out function
          >
            LogOut
          </button>
          {children}
        </div>
      )}

    </div>
  );
}
