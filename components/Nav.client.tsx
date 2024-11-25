import React from "react";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div className="w-full bg-black text-white flex px-16 py-8 justify-between">
      <div>Logo</div>
      <div className="border-2 border-solid border-yellow-400 ">
        <Link href="/nps">NPS</Link>
        <Link href="/auth">Log In</Link>
      </div>
    </div>
  );
};

export default Nav;
