import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../global/Logo";
import Menu from "./Menu";
import Container from "../../global/Container";
import { NavLink } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Menu as Dropdown, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  PowerIcon,
  RocketLaunchIcon,
  SquaresPlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { useTheme, useThemeUpdate } from "../../provider";

function Header({ mobile, visibility, setVisibility, className }) {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const menuClass = classNames({
    "flex flex-col py-4 xl:py-0 w-64 xl:w-auto fixed xl:transition-none xl:static start-0 top-0 border-e border-slate-200 dark:border-slate-800 xl:border-e-0 bg-white dark:bg-slate-950 z-[1020] h-screen xl:h-auto flex-shrink-0 xl:translate-x-0": true,
    "transition-all": mobile,
    "-translate-x-full": !visibility && theme.direction === "ltr",
    "translate-x-full": !visibility && theme.direction === "rtl",
    [`${className}`]: className,
  });
  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  function handleLoginClick() {
    navigate("/login");
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user") || "{}");
    if (Object.entries(storedData).length !== 0 && storedData !== null)
      setUser(storedData);
  }, []);

  return (
    <div className="fixed start-0 top-0 isolate z-[1020] w-full border-b border-slate-200 bg-white px-3 py-4 dark:border-slate-800 dark:bg-slate-950 xl:py-3">
      <Container>
        <div className="w-100 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            {/* <div className="-ms-1.5 xl:hidden">
              <button
                onClick={() => {
                  setVisibility(true);
                }}
                className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-slate-400 transition-all ui-open:bg-slate-200 ui-open:text-slate-600 hover:bg-slate-200 hover:text-slate-600 ui-open:dark:bg-slate-800 ui-open:dark:text-slate-200 hover:dark:bg-slate-800 hover:dark:text-slate-200"
              >
                <Bars3Icon className="h-5" />
              </button>
            </div> */}
            <Link className="flex-shrink-0" to="/">
              <Logo />
            </Link>
          </div>
          {/* {visibility && (
            <div
              onClick={() => {
                setVisibility(false);
              }}
              className="fixed inset-0 z-[1019] bg-slate-950 bg-opacity-50"
            ></div>
          )} */}
          {/* <div className={menuClass}>
            <Menu mobile={mobile} />
          </div> */}
          <ul className="flex items-center gap-x-3 lg:gap-x-5">
            {/* Dark mode */}
            {/* <li className="relative inline-flex">
              <button
                onClick={() => {
                  theme.mode === "dark" && themeUpdate.mode("light");
                  theme.mode === "light" && themeUpdate.mode("dark");
                }}
                className={`inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-slate-400 transition-all hover:bg-slate-200 hover:text-slate-600 dark:bg-slate-800 dark:text-slate-300`}
              >
                {theme.mode === "dark" && <MoonIcon className="h-4" />}
                {theme.mode === "light" && <SunIcon className="h-5" />}
              </button>
            </li> */}
            {/* {user && (
              <li className="relative inline-flex">
                <Dropdown>
                  <Dropdown.Button className="inline-flex h-9 w-9 overflow-hidden rounded-full outline outline-2 outline-offset-2 outline-slate-300 dark:outline-slate-700">
                    <img src="/images/avatar/a.jpg" alt="" />
                  </Dropdown.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Dropdown.Items className="absolute end-0 top-10 w-48 rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                      <div className="flex items-center p-4">
                        <div className="inline-flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full outline outline-2 outline-offset-2 outline-slate-300 dark:outline-slate-700">
                          <img src="/images/avatar/a.jpg" alt="" />
                        </div>
                        <div className="ms-4">
                          <h6 className="-mt-0.5 text-xs font-bold text-slate-700 dark:text-white">
                            Phillip Burke
                          </h6>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-500 dark:bg-blue-950">
                            Balance $18.89
                          </span>
                        </div>
                      </div>
                      <ul className="border-t border-slate-200 py-2 dark:border-slate-800">
                        <li>
                          <NavLink
                            to="/admin/dashboard"
                            className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 dark:text-slate-400 hover:dark:text-blue-600"
                          >
                            <SquaresPlusIcon className="me-2 w-4" />
                            <span>Admin</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/app/profile"
                            className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 dark:text-slate-400 hover:dark:text-blue-600"
                          >
                            <UserIcon className="me-2 w-4" />
                            <span>Profile</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/app/packages"
                            className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 dark:text-slate-400 hover:dark:text-blue-600"
                          >
                            <RocketLaunchIcon className="me-2 w-4" />
                            <span>Upgrade</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/login"
                            className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 dark:text-slate-400 hover:dark:text-blue-600"
                          >
                            <PowerIcon className="me-2 w-4" />
                            <span onClick={logout}>Logout</span>
                          </NavLink>
                        </li>
                      </ul>
                    </Dropdown.Items>
                  </Transition>
                </Dropdown>
              </li>
            )} */}

            <li>
              <button
                onClick={user ? logout : handleLoginClick}
                to={user ? "/signup" : "/login"}
                className={`inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-blue-800 disabled:pointer-events-none disabled:bg-blue-600/50 disabled:hover:bg-blue-600/50 sm:w-auto`}
              >
                {user ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Header;
