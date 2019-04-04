import React from "react";
import ContentHeaderContainer from "containers/post/PostHeaderContainer";
import PostContainer from "containers/post/PostContainer";

const PostPage = ({ match }) => {
  const { id } = match.params;
  return (
    <div>
      <ContentHeaderContainer id={id} />
      <PostContainer id={id} />
    </div>
  );
};

export default PostPage;
