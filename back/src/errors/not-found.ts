import { AppError } from "@/errors/app-error";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}
