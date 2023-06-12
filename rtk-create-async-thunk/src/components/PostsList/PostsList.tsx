import React, { FC } from 'react';

import { IPost } from '~/types/post';
import styles from './PostsList.module.scss';
import Post from '~/components/Post';

interface IProps {
  posts: IPost[];
}

const PostsList: FC<IProps> = ({ posts }) => {
  return (
    <ul className={styles.list}>
      {posts.map((post) => <Post key={post.id} post={post} />)}
    </ul>
  );
};

export default PostsList;
