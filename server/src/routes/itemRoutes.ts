import { Router } from "express";
import {
  getAllCategories,
  getAllItems,
  getItemById,
} from "../controllers/itemControl.js";

const router = Router();

router.get("/categories", getAllCategories);

router.get("/items", getAllItems);

router.get("/items/:id", getItemById);

export default router;
