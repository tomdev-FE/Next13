import Link from "next/link";
import { Button } from "@roketid/windmill-react-ui";

export default function Sidebar() {
  return (
    <>
      <aside className="z-30 flex-shrink-0 w-64 overflow-y-auto bg-gray-800 block">
        <div className="text-gray-400 mt-14">
          <div className="ml-6 py-6">
            <h1 className="text-white font-bold text-lg">Demo Dashboard</h1>
          </div>
          <div className="px-6 my-6">
            <Link href="/create" passHref>
              <Button>
                Create new user
                <span className="ml-2" aria-hidden="true">
                  +
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
