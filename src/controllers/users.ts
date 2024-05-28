import express from 'express';
import { getUsers, deleteUserById, getUserById } from '../db/users';

type GetAllUsersFunction = () => Promise<any>; // Should return Users[]

export const createGetAllUsers = (getUsers: GetAllUsersFunction) => async (
    req:express.Request,
    res: express.Response
  ) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export const getAllUsers = createGetAllUsers(getUsers);

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);
    
    user.username = username;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}