import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDto } from 'src/domain/dtos';
import { UserModel } from 'src/domain/models';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user.repository';
import { IUSER_SHARED } from 'src/common/constants';
import { UserModelMock } from 'src/common/mock/movies.mock.const';
import { HttpStatusCode } from 'axios';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const userRepositoryMock: Partial<IUserRepository> = {
      getAll: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUSER_SHARED.IUSERREPOSITORY,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<IUserRepository>(
      IUSER_SHARED.IUSERREPOSITORY,
    );
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const userDto: UserDto = {
        _id: '1',
        name: 'John Doe',
        email: 'dummy@gmail.com',
      };
      const users: UserModel[] = UserModelMock;
      const getAllSpy = jest
        .spyOn(userRepository, 'getAll')
        .mockResolvedValueOnce(users);

      const result = await userService.getAll(userDto);

      expect(getAllSpy).toHaveBeenCalledWith(userDto);
      expect(result).toEqual(users.map((user) => new UserDto(user)));
    });

    it('should throw HttpException when an error occurs', async () => {
      const userDto: UserDto = {
        _id: '1',
        name: 'John Doe',
        email: 'dummy@gmail.com',
      };
      const getAllSpy = jest
        .spyOn(userRepository, 'getAll')
        .mockRejectedValueOnce(
          new HttpException('Custom error', HttpStatusCode.Conflict),
        );

      await expect(userService.getAll(userDto)).rejects.toThrowError(
        HttpException,
      );

      expect(getAllSpy).toHaveBeenCalledWith(userDto);
    });
  });
});
