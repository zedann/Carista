import { Router } from "express";
import { handleAsync } from "../utils/handleAsync";
import { createCar, deleteCar, getAllCars, getCarById, updateCar } from '../controllers/car.controller'

const router = Router();

router.route('/').post(handleAsync(createCar)).get(handleAsync(getAllCars))
router.get('/:id', handleAsync(getCarById))
router.patch('/:id', handleAsync(updateCar))
router.delete("/:id", handleAsync(deleteCar))
