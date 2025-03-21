import NavBar from "@/components/NavBar";
import { useSession, signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log(session?.user)

  // Check the role on the session. If not an admin, show the login button.
  if (!session || session.user.role !== "admin") {
    return (
      <div className="bg-gray-50 w-screen h-screen flex items-center justify-center mr-2">
        <button
          className="p-2 px-4 bg-gray-300 rounded-lg hover:cursor-pointer"
          onClick={() => signIn("google")}
        >
          SignIn as Admin
        </button>
      </div>
    );
  }

  return (
    <div className="flex">
      <NavBar />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex bg-slate-100 justify-between m-2 ml-0 mt-0 p-3 rounded-md">
          <p>Welcome, <strong>{session.user.name ?? "Unknown user"}</strong></p>
          <div className="flex gap-2">
            <button
              className="p-1 px-2 gap-1 items-center justify-center text-sm bg-red-600 text-white rounded-lg hover:cursor-pointer hover:bg-red-700 inline-flex"
              onClick={() => signOut()} // Sign Out function
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
              </svg>
              LogOut
            </button>
            <img
              src={session.user.image || ""}
              alt="User profile"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>
        </div>
        <div className="m-2 lg:m-4">
          {children}
        </div>
      </div>
    </div>
  );
}
