import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <main className="min-h-[100svh]">
      <div className="max-w-md mx-auto my-20 p-6 bg-red-100 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold text-red-800">404 Not Found</h1>
      <p className="mt-2 text-red-700">
        An unexpected error occurred, please try again later or navigate back to
        home page
      </p>
      <Link to="/">
        <Button className="mt-4" variant="destructive">
          Click here
        </Button>
      </Link>
    </div>
    </main>
  );
};

export default NotFoundPage;
