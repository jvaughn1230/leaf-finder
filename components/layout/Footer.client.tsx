import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-full text-center pb-1  bg-transparent">{`\u00A9 ${year} Jeffrey Vaughn`}</div>
  );
};

export default Footer;
