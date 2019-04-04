import React, { Component } from "react";
import PostList from "components/list/PostList";
import { connect } from "react-redux";
import * as listActions from "store/modules/list";
import { bindActionCreators } from "redux";
import LoadingView from "components/common/LoadingView";

class PostListContainer extends Component {
  getPostList = () => {
    //페이지와 태그 값을 부모에게서 받아 옵니다.
    const { tag, page, ListActions } = this.props;
    ListActions.getPostList({
      page,
      tag
    });
  };

  handleScroll = () => {
    const { isLoading, isLast, ListActions, posts } = this.props;
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 100) {
      if (!isLoading && !isLast) {
        ListActions.setLoading();
        setTimeout(() => {
          const nextPage = posts.toJS().length / 16 + 1;
          ListActions.getPostList({ page: nextPage, next: 1 });
          setTimeout(() => {
            ListActions.initLoading();
          }, 1000);
        }, 2000);
      }
    }
  };

  componentDidMount() {
    this.getPostList();
    // 스크롤링 이벤트 추가
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // 언마운트 될때에, 스크롤링 이벤트 제거
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { posts, isLoading } = this.props;

    return (
      <div>
        <PostList posts={posts} />
        <LoadingView isLoading={isLoading} />
      </div>
    );
  }
}

export default connect(
  state => ({
    lastPage: state.list.get("lastPage"),
    posts: state.list.get("posts"),
    isLast: state.list.get("isLast"),
    isLoading: state.list.get("isLoading")
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(PostListContainer);
