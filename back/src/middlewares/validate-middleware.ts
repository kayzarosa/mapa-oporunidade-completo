import type { FastifyRequest } from "fastify";
import type { ZodType } from "zod";

type ValidationSchemas = {
  body?: ZodType;
  params?: ZodType;
  querystring?: ZodType;
};

export function validate(schemas: ValidationSchemas) {
  return async (request: FastifyRequest) => {
    if (schemas.body) {
      request.body = schemas.body.parse(request.body);
    }

    if (schemas.params) {
      request.params = schemas.params.parse(request.params);
    }

    if (schemas.querystring) {
      request.query = schemas.querystring.parse(request.query);
    }
  };
}
