import React, { useState } from "react";
import { Input, Button } from "@mui/base";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const SkillSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white flex justify-between items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl mx-6">
      <div className="flex-grow-0 flex-shrink-0 w-1/2 sm:w-auto">
        <Input
          slotProps={{
            root: {
              className:
                "border-none h-8 w-full flex items-center justify-start",
            },
            input: {
              className:
                "w-full bg-transparent font-normal outline-none ml-2 text-[rgba(97,120,138,1)]",
              placeholder: "Search for a skill",
              type: "text",
            },
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startAdornment={
            <div className="w-5 h-5 flex items-center">
              <CiSearch className="text-4xl" />
            </div>
          }
        />
      </div>
      <Link to={`/explore?query=${searchQuery}`}>
        <Button className="bg-[rgba(28,145,242,1)] font-bold text-white min-w-[104px] h-12 w-[104px] cursor-pointer rounded-xl">
          Explore
        </Button>
      </Link>
    </div>
  );
};

export default SkillSearchBar;
