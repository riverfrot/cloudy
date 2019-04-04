import React from "react";
import styles from "./NotFound.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const cx = classNames.bind(styles);

const NotFound = () => {
  return (
    <div className={cx("main")}>
      <div>
        <Helmet>
          <title>Cloudy - 404Page</title>
        </Helmet>
      </div>
      <div className={cx("notfound")}>
        <h1>Error 404 Page Not Found!</h1>
        <h3>Sorry About that! return home?</h3>
        <Link to="/">
          <h2>Return Home</h2>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
