import React from "react";

import { MdEmail } from "react-icons/md";
import { GrLinkedin } from "react-icons/gr";
import { CgWebsite } from "react-icons/cg";

import "./css/footer.css";

export const Footer = () => {
  return (
    <div id="footerArea">
      <div className="comman-width">
        <div id="footerAreaAlighn">
          <a
            href={`https://nikhil-sharma-portfolio.netlify.app/`}
            target="blank"
          >
            <CgWebsite></CgWebsite>
          </a>
          <a href="mailto:nikhil23062000@icloud.com">
            <MdEmail></MdEmail>
          </a>

          <a href={`https://www.linkedin.com/in/-nikhilsharma/`} target="blank">
            <GrLinkedin></GrLinkedin>
          </a>
        </div>
      </div>
    </div>
  );
};
