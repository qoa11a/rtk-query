import React, { FC } from 'react';
import { IPost } from '~/types/post';

interface IProps {
  post: IPost;
}

const Post: FC<IProps> = ({ post }) => {
  return (
    <li>
      {post.title}
    </li>
  );
};

export default Post;
