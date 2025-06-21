import { useEffect, useState } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

const LabelFilter = () => {
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    const fetchLabels = async () => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/labels",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      setLabels(data);
    };
    fetchLabels();
  }, []);

  // todo - render labels
  return (
    <GithubFilter
      elements={labels}
      label="Labels"
      filterFn={(el, query) => el.name.includes(query)}
      getKey={(el) => el.name}
    >
      {(el) => <Label label={el} />}
    </GithubFilter>
  );
};

export default LabelFilter;

function Label({ label }) {
  return (
    <div className="flex gap-2 items-center">
      <span
        className="size-6 rounded-full border"
        style={{ backgroundColor: `#${label.color}` }}
      />
      <span>{label.name}</span>
    </div>
  );
}
