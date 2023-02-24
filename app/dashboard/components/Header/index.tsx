import { useRouter } from "next/navigation";

import { useStateContext } from "@/context/AuthContext";

export default function Header() {
  const stateContext = useStateContext();
  const router = useRouter();

  const logout = () => {
    stateContext.dispatch({
      type: "SET_USER",
      payload: { authStatus: false },
    });
    router.push("/");
  };
  return (
    <header className="z-40 py-4 shadow-bottom bg-gray-800">
      <div className="container flex items-center  h-full px-6 mx-auto text-purple-600 justify-end	">
        <button
          className="bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
          onClick={logout}
          aria-label="Menu"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
