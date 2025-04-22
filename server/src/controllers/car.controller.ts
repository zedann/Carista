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
}
export const getCarById = async (req: Request, res: Response, next: NextFunction) => { }
export const updateCar = async (req: Request, res: Response, next: NextFunction) => { }
export const deleteCar = async (req: Request, res: Response, next: NextFunction) => { }
