import NavBar from "@/components/NavBar";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showMenu, setShowMenu] = useState(false);

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
    <div className="flex flex-col md:flex-row">
      <div className="flex md:hidden p-4 items-center">
        <button onClick={() => setShowMenu(!showMenu)}>
          {!showMenu ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          )}
        </button>
        <div className="flex grow justify-center mr-4">
          <Link href={'/'} className='border-b border-gray-700 rounded flex gap-1 text-xl sm:text-2xl font-semibold items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
            </svg>
            ShopSphere Admin Panel
          </Link>
        </div>

      </div>
      <NavBar showMenu={showMenu} closeMenu={() => setShowMenu(false)} />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex bg-slate-100 justify-between m-2 ml-0 mt-0 p-3 rounded-md">
          <p>Welcome, <strong>{session.user.name ?? "Unknown user"}</strong></p>
          <div className="flex gap-2">
            <button
              className="p-0.5 px-1 sm:p-1 sm:px-2 gap-0.5 items-center justify-center text-xs md:text-sm bg-red-600 text-white rounded-lg hover:cursor-pointer hover:bg-red-700 inline-flex"
              onClick={() => signOut()} // Sign Out function
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-2 sm:size-3 md:size-4">
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
