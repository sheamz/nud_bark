import React from "react";
import NavUser from "../../components/NavUser";
import HomeCat from "./HomeCat";
import HomeContri from "./HomeContri";
import HomeList from "./HomeList";
import HomeUpper from "./HomeUpper";

export default function Home() {
  return (
    <>
      <NavUser />
      <HomeUpper />

      <div className="flex">
      <HomeList />
      <HomeContri />
      </div>

      <div className="underline"></div>

      <HomeCat />
    </>
  );
}
