import { Test, TestingModule } from '@nestjs/testing';
import { MenteeController } from '../controllers/mentee.controller';

describe('MenteeController', () => {
  let controller: MenteeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenteeController],
    }).compile();

    controller = module.get<MenteeController>(MenteeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
