import React from "react";
import { Link } from "react-router";

type AuthLinkProps = {
  promptText: string;
  linkText: string;
  to: string;
};

const AuthLink: React.FC<AuthLinkProps> = ({ promptText, linkText, to }) => {
  return (
    <div className="text-sm flex gap-1">
      <p>{promptText}</p>
      <Link
        to={to}
        className="text-indigo-500 hover:text-indigo-400 transition-colors duration-150"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthLink;
