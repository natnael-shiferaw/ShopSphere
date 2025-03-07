import NavBar from "@/components/NavBar";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();

  return (
    <>
    <div className="flex">
      <NavBar />

      <div className="flex flex-col gap-2 w-full">
        {/** checks for user's session */}
        <div>
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
            <div className="flex bg-slate-100 justify-between m-2 ml-0 p-3 rounded-md">
              <p>Welcome, <strong>{session.user?.name ?? "Unknown user"}</strong></p>
              <div className="flex gap-2">
                <button
                  className="p-1 px-2 text-sm bg-red-500 text-white rounded-lg hover:cursor-pointer"
                  onClick={() => signOut()} // Sign Out function
                >
                  LogOut
                </button>
                <img
                    src={session.user?.image || ""}
                    alt="User profile"
                    className="w-10 h-10 rounded-full border border-gray-300" 
                  />
              </div>

            </div>
          )}
        </div>

        {children}
      </div>

    </div>
    </>
  );
}
