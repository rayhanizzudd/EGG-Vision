import React from "react";
import { Link } from "react-router-dom";

export default function NavLink({ href, children, childimg , reverse = false, underline = false}) {
  return (
      <Link className='flex' to={href}>
          <div className={`flex items-center ${reverse? 'flex-row-reverse' : ''} font-medium hover:underline transition-all hover:rounded-lg gap-5 ${underline? '' : 'hover:no-underline'}`}>
          <img className="w-8" src={childimg} alt=""/>
          {children}
          </div>
      </Link>
  );
}