import React from "react";
import { Link } from "react-router-dom";
import Container from "../../global/Container";
function Footer() {
  return (
    <div className="relative isolate mt-auto border-t border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-950">
      <Container>
        <div className="flex items-center justify-center">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-200">
            &copy; 2024. Crafted By&nbsp;
            <a
              className="text-slate-700 transition-all hover:text-blue-600 dark:text-white hover:dark:text-blue-600"
              href="/"
              target="_blank"
            >
              GruntAI
            </a>
          </p>
          {/* <ul className="-mx-3 flex flex-wrap">
                        <li>
                            <Link
                                className="px-3 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-blue-600 hover:dark:text-blue-600 transition-all"
                                to="#"
                            >
                                Terms
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="px-3 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-blue-600 hover:dark:text-blue-600 transition-all"
                                to="/app/faq"
                            >
                                Faq
                            </Link>
                        </li>
                    </ul> */}
        </div>
      </Container>
    </div>
  );
}

export default Footer;
