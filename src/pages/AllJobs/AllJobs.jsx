import { useState } from "react";
import useJobs from "../../hooks/useJobs";
import HotJobCard from "../Home/HotJobCard";

const AllJobs = () => {
  const [sort, setSort] = useState(false);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [search, setSearch] = useState("");
  const { jobs, loading } = useJobs(sort, search,minSalary,maxSalary);

  //   console.log(jobs);
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <div className="w-11/12 mx-auto text-center flex gap-3">
        <button
          className={`btn btn-neutral ${sort ? "bg-green-600 text-white" : ""}`}
          onClick={() => setSort(!sort)}
        >{`${sort ? "Sorted by Price" : "Sort by Price"}`}</button>
        <input
          onKeyUp={(e) => setSearch(e.target.value)}
          className="rounded-lg p-2"
          placeholder="Search by Location"
          type="text"
        />
        <div>
          <input
            onKeyUp={(e) => setMinSalary(e.target.value)}
            className="rounded-lg p-2"
            placeholder="Min Salary"
            type="text"
          />
          <input
            onKeyUp={(e) => setMaxSalary(e.target.value)}
            className="rounded-lg p-2"
            placeholder="Max Salary"
            type="text"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <HotJobCard key={job._id} job={job}></HotJobCard>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
