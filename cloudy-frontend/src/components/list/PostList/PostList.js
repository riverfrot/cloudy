import React, { Component } from "react";
import PostCard from "components/card/PostCard/PostCard";
import { Grid } from "semantic-ui-react";
import withSizes from "react-sizes";

class PostList extends Component {
  render() {
    const { posts } = this.props;
    const postList = posts.map(post => {
      const {
        _id,
        title,
        body,
        publishedDate,
        tags,
        randomImageNumber
      } = post.toJS();
      const striptags = require("striptags");
      let result;
      if (body) {
        result = striptags(body);
      }
      return (
        <Grid.Column key={_id}>
          <PostCard
            title={title}
            body={result}
            publishedDate={publishedDate}
            tags={tags}
            randomImageNumber={randomImageNumber}
            id={_id}
          />
        </Grid.Column>
      );
    });

    return (
      <Grid
        container
        columns={this.props.isMobile ? 2 : this.props.isMedium ? 3 : 4}
      >
        {postList}
      </Grid>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
  isMedium: width < 720
});
export default withSizes(mapSizesToProps)(PostList);
