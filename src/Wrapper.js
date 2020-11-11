import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { d2Atom } from "./atoms";
import { Home } from "./components/Home";
export const Wrapper = ({ d2 }) => {
  const [, setD2] = useRecoilState(d2Atom);
  useEffect(() => {
    setD2(d2);
  }, []);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Home />
    </React.Suspense>
  );
};
