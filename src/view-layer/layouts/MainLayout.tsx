import { ComponentType, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useProductsContext } from "@view/contexts/ProductsContext";
import { useAuthContext } from "@view/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";

const MainLayout = ({ children }: PropsWithChildren) => {
  const { logout } = useAuthContext();
  const { carts, filterMeta } = useProductsContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const showSearchBox = pathname === "/products" || pathname === "/";

  return (
    <section className="">
      <nav className="sticky top-0 flex w-full flex-wrap items-center justify-between bg-[#1b1b1b] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-te-collapse-item
          >
            <div
              className="mb-4 ml-2 mr-5 mt-3 cursor-pointer flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
              onClick={() => navigate("/products")}
            >
              <img
                src="https://goskyway.com/wp-content/uploads/2022/08/skyway_logo_w_245.png"
                style={{ height: "15px" }}
                alt="Skyway Logo"
              />
            </div>
          </div>

          {showSearchBox && (
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={(e) => filterMeta.setKeyword(e.target.value)}
              />
            </div>
          )}

          <div
            className="relative flex items-center ml-5"
            onClick={() => navigate("/carts")}
          >
            <div className="hidden-arrow mr-4 cursor-pointer flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400">
              <FontAwesomeIcon icon={faCartPlus} color="#fff" />
              <span className="absolute -mt-4 ml-2.5 rounded-full bg-[#b91d12] px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                {carts.length}
              </span>
            </div>
          </div>

          <div className="relative flex items-center" onClick={() => logout()}>
            <div className="hidden-arrow mr-4 cursor-pointer flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400">
              <FontAwesomeIcon icon={faSignOut} color="#fff" />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </section>
  );
};

export const withMainLayout =
  <P extends object>(Component: ComponentType<P>) =>
  (Props: P) =>
    (
      <MainLayout>
        <Component {...Props} />
      </MainLayout>
    );
