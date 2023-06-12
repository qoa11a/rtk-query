import React, { FC } from 'react';

import { IUser } from '~/types/user';
import User from '~/components/User';

interface IProps {
  users: IUser[];
}

const UsersList: FC<IProps> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => <User key={user.id} user={user} />)}
    </ul>
  );
};

export default UsersList;
