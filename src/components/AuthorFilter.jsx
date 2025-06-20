import { useEffect, useState } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

const AuthorFilter = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contributors",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  // todo - render authors
  return (
    <GithubFilter
      elements={authors}
      label="Authors"
      filterFn={(el, query) => el.login.includes(query)}
      getKey={(el) => el.login}
    >
      {(el) => <Author author={el} />}
    </GithubFilter>
  );
};
export default AuthorFilter;

function Author({ author }) {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={author.avatar_url}
        className="size-6 rounded-full object-cover"
      />
      <span>{author.login} </span>
    </div>
  );
}
