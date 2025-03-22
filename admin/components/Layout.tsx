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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          ShopSphere Admin Panel
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-12">
          Welcome! Please sign in with your admin account to continue.
        </p>
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
               fill="currentColor" viewBox="0 0 48 48" className="w-6 h-6">
            <path d="M44.5 20H24v8.5h11.8C34.9 33.2 30 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.5 6.7 29.1 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19 19-8.5 19-19c0-1.3-.1-2.7-.5-4z"/>
          </svg>
          Sign in with Google
        </button>
      </div>
      <footer className="mt-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
      </footer>
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
