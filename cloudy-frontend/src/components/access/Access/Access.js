import React from "react";
import styles from "./Access.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const cx = classNames.bind(styles);

const Access = () => {
  return (
    <div className={cx("main")}>
      <div>
        <Helmet>
          <title>Cloudy - 로그인 필요!</title>
        </Helmet>
      </div>
      <div className={cx("accesslogin")}>
        <h1>This Page Need To Login!</h1>
        <h3>Sorry About that! return LoginPage?</h3>
        <Link to="/login">
          <h2>Return LoginPage</h2>
        </Link>
      </div>
    </div>
  );
};

export default Access;
