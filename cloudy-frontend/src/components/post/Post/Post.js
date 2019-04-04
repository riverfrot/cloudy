import React from "react";
import { Container, Grid, Header, Label, Divider } from "semantic-ui-react";
import moment from "moment";

const Post = ({ title, body, publishedDate, tags, publisher }) => {
  console.log(tags);
  let tagList;

  if (tags !== undefined) {
    tagList = tags.map(tag => <Label key={tag}>#{tag}</Label>);
  }

  return (
    <div>
      <Container text style={{ marginTop: "7em" }}>
        <Grid style={{ marginBottom: "1em" }}>
          <Grid.Column floated="left" width={5}>
            <h1>{title}</h1>
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            <h5 style={{ fontStyle: "italic" }}>{`by ${publisher}`}</h5>{" "}
            {moment(publishedDate).format("ll")}
          </Grid.Column>
        </Grid>

        <Label.Group circular>{tagList}</Label.Group>

        <Divider horizontal>Content</Divider>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Container>
    </div>
  );
};

export default Post;
