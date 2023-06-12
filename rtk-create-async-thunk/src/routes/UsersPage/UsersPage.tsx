import React, { FC } from 'react';
import { useAppSelector } from '~/app/hooks';
import { RootState } from '~/app/store';
import UsersList from '~/components/UsersList';
import Loader from '~/components/Loader';
import Error from '~/components/Error';

const UsersPage: FC = () => {
  const { users, isLoading, hasError } =
    useAppSelector((state: RootState) => state.users);

  if (isLoading) return <Loader />;

  if (hasError) return <Error />;

  return (
    <>
      <UsersList users={users} />
    </>
  );
};

export default UsersPage;
