import React from "react";
import { Helmet } from "react-helmet";

function Head({ parent, child }) {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {parent ? parent : "Arethis Merchant Admin"} | {child && child}
        </title>
        <link rel='canonical' href='' />
      </Helmet>
    </div>
  );
}

export default Head;
