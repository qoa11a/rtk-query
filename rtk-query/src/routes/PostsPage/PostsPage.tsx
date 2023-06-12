import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useId,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { RootState } from '~/app/store';
import {
  setUserId,
} from '~/features/posts/postsSlice';
import PostsList from '~/components/PostsList';
import Loader from '~/components/Loader';
import Error from '~/components/Error';
import {
  useCreatePostMutation,
  useFetchAllPostsQuery,
  useFetchAllUsersQuery,
} from '~/features/api/apiSlice';

import styles from './PostsPage.module.scss';

const initialFormData = {
  title: '',
  body: '',
  userId: '',
};

const PostsPage: FC = () => {
  const { selectedUserId } =
    useAppSelector((state: RootState) => state.posts);
  const {
    data: posts = [],
    isFetching,
    isError,
  } = useFetchAllPostsQuery({ userId: selectedUserId });
  const { data: users = [] } = useFetchAllUsersQuery();
  const [createPost] = useCreatePostMutation();
  const dispatch = useAppDispatch();
  const userSelectId = useId();
  const [formData, setFormData] = useState(initialFormData);

  const handleUserSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      dispatch(setUserId(null));

      return;
    }

    dispatch(setUserId(Number(e.target.value)));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = {
      ...formData,
      userId: Number(formData.userId),
    };

    await createPost(post);

    setFormData(initialFormData);
  };

  if (isFetching) return <Loader />;

  if (isError) return <Error />;

  return (
    <div className={styles.container}>
      <label htmlFor={userSelectId}>Select a user</label>

      <select
        name="selectUser"
        id={userSelectId}
        value={selectedUserId || ''}
        onChange={handleUserSelect}
      >
        <option value="">Please select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="Title"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Body"
          id="body"
          value={formData.body}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="User ID"
          id="userId"
          value={formData.userId}
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
      </form>

      <PostsList posts={posts} />
    </div>
  );
};

export default PostsPage;
