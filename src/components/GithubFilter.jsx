import { useState, useRef, useEffect } from "react";
import {
  SearchRegular,
  DismissRegular,
  CaretDownFilled,
} from "@fluentui/react-icons";

function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);
}

const GithubFilter = ({ elements, label, children, filterFn, getKey }) => {
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  useClickOutside(filterRef, setShowFilter);

  return (
    <div className="flex flex-col gap-4 min-w-64" ref={filterRef}>
      <div className="flex gap-8 items-center">
        <span
          className="cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {label}
        </span>

        <CaretDownFilled />
      </div>

      {showFilter && (
        <div className="border rounded-xl p-4 shadow-lg">
          <label className="flex flex-col gap-1 mb-2">
            <div className="flex justify-between items-center">
              <span
                className="font-semibold"
                onClick={() => setShowFilter((prev) => !prev)}
              >
                Filter by {label}
              </span>
              <DismissRegular
                onClick={() => setShowFilter((prev) => !prev)}
                className="cursor-pointer text-xl"
              />
            </div>
            <div className="relative">
              <SearchRegular className="absolute left-2 top-2" />
              <input
                type="text"
                className="border pl-8 px-2 py-1 font-light rounded-lg"
                value={query}
                placeholder={`Filter ${label.toLowerCase()}`}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </label>

          <ul className="flex flex-col gap-2">
            {elements
              .filter((el) => filterFn(el, query))
              .map((el) => (
                <li key={getKey(el)}>{children(el)}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GithubFilter;
