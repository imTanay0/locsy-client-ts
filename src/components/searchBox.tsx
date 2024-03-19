import { FormEvent, useState } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(search);
    navigate(`/products/${search}`);

    setSearch("");
  };

  return (
    <div className="flex items-center gap-4">
      <form className="flex items-center gap-2" onSubmit={handleSearch}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-40 md:w-64"
          placeholder="Search products..."
          type="search"
        />
        <Button size="icon" variant="ghost" type="submit">
          <SearchIcon className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
