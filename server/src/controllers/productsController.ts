import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const search = req.query.search?.toString();

    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products.' });
  }
};

export const createProducts = async (req: Request, res: Response) => {
  try {
    const { productId, name, price, stockQuantity, rating } = req.body;

    const products = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        stockQuantity,
        rating,
      },
    });

    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product.' });
  }
};
