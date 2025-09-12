import React from "react";

import { workExperience } from "@/data";
import { Button } from "./ui/moving-border";

const Experience = () => {
  return (
    <Button
      //   random duration will be fun , I think , may be not
      duration={Math.floor(Math.random() * 10000) + 10000}
      borderRadius="1.75rem"
      // remove bg-white dark:bg-slate-900
      className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
    >
      <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
        <img
          src={workExperience[0].thumbnail}
          alt={workExperience[0].thumbnail}
          className="lg:w-32 md:w-20 w-16"
        />
      </div>
    </Button>
  );
};

export default Experience;
