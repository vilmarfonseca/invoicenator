"use client";
import DashboardIcon from "@/components/Icons/DashboradIcon";
import InvoicesIcon from "@/components/Icons/InvoicesIcon";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import UsersIcon from "@/components/Icons/UsersIcon";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const navigation = [
    {
      href: "/dashboard",
      name: "Overview",
      icon: <DashboardIcon />,
    },
    {
      href: "/dashboard/invoices",
      name: "Invoices",
      icon: <InvoicesIcon />,
    },
    {
      href: "/dashboard/clients",
      name: "Clients",
      icon: <UsersIcon />,
    },
  ];

  const { logout, authUser } = useAuth();
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 h-full border-r bg-white space-y-8 w-60 lg:w-80">
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-8">
            <Link href="/dashboard" className="flex-none">
              <div className="flex justify-center">
                <Logo />
              </div>
            </Link>
          </div>
          <div className="flex-1 flex flex-col h-full overflow-auto">
            <ul className="px-4 text-sm font-medium flex-1">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 duration-200 ${
                      pathname === item.href ? "bg-gray-100" : ""
                    } `}
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium">
                <li>
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-200"
                  >
                    <div className="text-gray-500">
                      {" "}
                      <LogoutIcon />
                    </div>
                    Logout
                  </button>
                </li>
              </ul>
              <div className="py-4 px-4 border-t">
                <div className="flex items-center gap-x-4">
                  <Image
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                    width={40}
                    height={40}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                  <div>
                    {/* <span className="block text-gray-700 text-sm font-semibold">
                      Vilmar Fonseca
                    </span> */}
                    <span className="block mt-px text-gray-600 text-xs">
                      {authUser?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
