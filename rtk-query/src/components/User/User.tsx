import React, { FC } from 'react';
import { IUser } from '~/types/user';

interface IProps {
  user: IUser;
}

const User: FC<IProps> = ({ user }) => {
  return (
    <li>
      {user.username}
    </li>
  );
};

export default User;
