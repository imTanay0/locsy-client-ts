import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="p-10 flex justify-center items-center h-40 flex-col gap-5">
      <h1 className="font-bold text-4xl">404 Not Found</h1>
      <p className="">
        Navigate back to{" "}
        <Link to="/" className="underline">
          Home Page
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
