import { useState, useEffect } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

const MilestoneFilter = () => {
  const [milestones, setMilestones] = useState([]);
  useEffect(() => {
    const fetchMilestones = async () => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/milestones",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      setMilestones(data);
    };
    fetchMilestones();
  }, []);

  // todo - render milestones
  return (
    <GithubFilter
      elements={milestones}
      label="Milestones"
      filterFn={(el, query) => el.title.includes(query)}
      getKey={(el) => el.title}
    >
      {(el) => <Milestone milestone={el} />}
    </GithubFilter>
  );
};

export default MilestoneFilter;

function Milestone({ milestone }) {
  return (
    <div className="flex gap-2 items-center">
      <span>{milestone.title}</span>
    </div>
  );
}
