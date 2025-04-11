import { Request, Response, NextFunction } from "express";

export const fieldValidator = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      const value = req.body[field];

      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        return res.status(400).json({
          message: `${field} is required and cannot be empty`,
        });
      }
    }

    next();
  };
};
