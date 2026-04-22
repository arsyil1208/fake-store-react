import { useState } from "react";
import CardComponent from "./CardComponets";
import CardComersComponets from "./CardComersComponets";

export default function WrapperComponets({ data, type, children }) {
  return (
    <div className="w-5xl block mx-auto">
      {children}
      <div className="grid grid-cols-4 gap-4 my-15">
        {data.map((item, index) =>
          type === "CategoryPrtoduct" ? (
            <CardComponent CategoryPrtoduct={item} key={index} />
          ) : (
            <CardComersComponets
              products={item}
              key={index}
            />
          ),
        )}
      </div>
    </div>
  );
}
