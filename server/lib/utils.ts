import { Response } from "express";

export async function sendInternalErrorOnFail(
  res: Response,
  cb: () => void | Promise<void>
) {
  try {
    await cb();
  } catch (e) {
    res.status(500).send(null);
  }
}
