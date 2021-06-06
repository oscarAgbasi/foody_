import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { ContextIdFactory } from '@nestjs/core';
import { async } from 'rxjs';
import { UpdateFoodDto } from './dto/update-food.dto';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('FoodsController', () => {
  let controller: FoodsController;
  let service: FoodsService;

  const mockFoodsService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),
    findOne: jest.fn(id => {
      return {
        id
      }
    }),
    update: jest.fn().mockResolvedValue((id, dto) => 
      Promise.resolve({id, ...dto})
    ),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodsController],
      providers: [
        FoodsService,
        { provide: getRepositoryToken(Food), useClass: mockRepository},
      ],
    }).overrideProvider(FoodsService)
    .useValue(mockFoodsService)
    .compile();

    controller = module.get<FoodsController>(FoodsController);
    service = module.get<FoodsService>(FoodsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a food ', () =>{
    const dto = {
    description: "Bread",
    publicationDate: "2019-04-01T00:00:00.000Z"
    };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      description: dto.description,
      publicationDate: dto.publicationDate
    });

    expect(service.create).toBeCalled();
    expect(mockFoodsService.create).toHaveBeenCalledWith(dto);
  });

  it('should one food by ID ', () =>{
    expect(controller.findOne(1)).toEqual({
      id: 1
    });
  });

  // it('should update food', async() => {
  //   const dto = {
  //         description: "Bread",
  //         publicationDate: "2019-04-01T00:00:00.000Z"
  //   };
  //   let user = await controller.update(1, dto);

  //   test('then it should return the updated user', ()=> {
  //     expect(user).toEqual({
  //       id:1,
  //       ...dto
  //     })
  //   })
  // })

  // describe('update', () => {
  //   describe('when updatedate is called', () => {
  //     let food: Food;
  //     let upateDto: UpdateFoodDto;

  //     beforeEach(async () => {
  //       upateDto = {
  //         description: "Bread",
  //         publicationDate: "2019-04-01T00:00:00.000Z"
  //       }

  //       food = await controller.update(1,upateDto);
  //     })

  //   test('then it should call foodservice', () => {
  //     expect(service.update).toHaveBeenCalledWith(1,upateDto);
  //   })
  //   test('then it should return the updated user', ()=> {
  //     expect(food).toEqual({
  //         id:food.id,
  //       ...upateDto
  //     })
  //   })
  //   })
  // })

  // it('should update food',  done =>{
  //   const dto = {
  //     description: "Bread",
  //     publicationDate: "2019-04-01T00:00:00.000Z"
  //   };
  //   try {
  //     controller.update(1, dto).then(res => {
  //       expect(res.description).resolves.toEqual(dto.description);
  //       expect(res.publicationDate).toEqual(dto.publicationDate);
  //     })
  //     // expect(controller.update(1,dto).then()).resolves.toEqual({
  //     //   id:1,
  //     //   ...dto
  //     // })
  //     }catch(e) {
  //       console.log(e)
  //     }
  //   // setTimeout(async() => {
  //   //   try {
  //   //     return await controller.update(1,dto).then(result => {
  //   //       expect(result).toEqual({
  //   //         id: 1,
  //   //         ...dto
  //   //       })
  //   //     })
  //   //   } catch (err) {
  //   //     console.log(err);
  //   //   }
  //   // })
  //   // await controller.update(1, dto).then(value => {
  //   //   expect(value).toEqual({
  //   //     id:1,
  //   //     ...dto
  //   //   })
  //   // });
  // });

  // it('should update food', async done =>{
  //   setTimeout(() => {
  //     const dto = {
  //       description: "Bread",
  //       publicationDate: "2019-04-01T00:00:00.000Z"
  //     };
  //     controller.update(1,dto).then(value => {
  //       console.dir(value)
  //         expect(value).toEqual({
  //           id: 1,
  //           ...dto
  //         })
  //     })
      
  //   });
  // });
    // const dto = {
    //   description: "Bread",
    //   publicationDate: "2019-04-01T00:00:00.000Z"
    // };
    // return controller.update(1, dto).then(value => {
    //   console.dir(value);
    //   expect(value).toEqual({
    //     id: 1,
    //     ...dto
    //   })
    // })
    // expect(await controller.update(1, dto)).toEqual({ 
    //   id: 1,
    //   ...dto
    // })

});
