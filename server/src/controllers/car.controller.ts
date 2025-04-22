import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpStatus } from "../constants/httpStatus";

export const createCar = async (req: Request, res: Response, next: NextFunction) => {
  const { make, model, year, kilometers, images, lastService } = req.body;
  const car = await prisma.car.create(
    {
      data: {
        make,
        model,
        year,
        kilometers,
        images,
        lastService: lastService ? new Date(lastService) : undefined,
      }
    }
  )

  res.status(HttpStatus.CREATED).json({
    message: "Car Created Succefully",
    data: car
  })
}
export const getAllCars = async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const cars = await prisma.car.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" }
  })

  res.status(HttpStatus.OK).json(
    {
      page,
      limit,
      data: cars
    }
  )

}
export const getCarById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await prisma.car.delete({ where: { id } })

  res.status(HttpStatus.NO_CONTENT).end();
}
export const updateCar = async (req: Request, res: Response, next: NextFunction) => { }
export const deleteCar = async (req: Request, res: Response, next: NextFunction) => { }
