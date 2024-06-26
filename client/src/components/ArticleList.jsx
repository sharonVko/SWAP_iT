import React from "react";
import ArticleCard from "./ArticleCard";
import { ads } from "../utils/ads";

const ArticleList = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {ads.map((ad, index) => (
          <ArticleCard key={index} article={ad} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
