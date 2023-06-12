import React, { FC } from 'react';

import UsersList from '~/components/UsersList';
import Loader from '~/components/Loader';
import Error from '~/components/Error';
import { useFetchAllUsersQuery } from '~/features/api/apiSlice';

const UsersPage: FC = () => {
  const { data: users = [], isFetching, isError } = useFetchAllUsersQuery();

  if (isFetching) return <Loader />;

  if (isError) return <Error />;

  return (
    <>
      <UsersList users={users} />
    </>
  );
};

export default UsersPage;
