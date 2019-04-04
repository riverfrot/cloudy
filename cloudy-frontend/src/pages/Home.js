import React from "react";
import PostListContainer from "containers/list/PostListContainer";
import HeaderContainer from "containers/common/HeaderContainer";

const Home = ({ match, location }) => {
  // page의 기본값을 1로 설정합니다.
  const { page = 1, tag } = match.params;

  return (
    <div>
      <HeaderContainer match={match} />
      <PostListContainer page={parseInt(page, 10)} />
    </div>
  );
};
export default Home;
