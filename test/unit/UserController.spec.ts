import { expect } from 'chai';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { createGetAllUsers } from '../../src/controllers/users'; // Import the route function

describe('getAllUsers', () => {
  it('should return all users', async () => {
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];
    const getUsersStub = sinon.stub().resolves(mockUsers); // Mock getUsers function
    const req = mockReq();
    const res = mockRes();

    const getAllUsers = createGetAllUsers(getUsersStub);
    await getAllUsers(req, res);

    expect(res.status.calledOnceWith(200)).to.be.true; // Expect status to be called with 200
    expect(res.json.calledOnceWith(mockUsers)).to.be.true; // Expect json to be called with mockUsers data
    expect(res.end.calledOnce).to.be.true; // Expect end to be called once
    expect(res.sendStatus.called).to.be.false; // Expect sendStatus not to be called
  });

  // it('should handle error', async () => {
  //   const getUsersStub = sinon.stub().rejects(new Error('Failed to get users')); // Mock getUsers function to throw an error
  //   const req = {}; // Mock Request object
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     sendStatus: sinon.stub()
  //   }; // Mock Response object

  //   await getAllUsers(req, res, getUsersStub); // Invoke the route function

  //   expect(res.status.calledOnceWith(400)).to.be.true; // Expect status to be called with 400
  //   expect(res.sendStatus.calledOnce).to.be.true; // Expect sendStatus to be called once
  // });
});
