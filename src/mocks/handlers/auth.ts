import { graphql, HttpResponse } from "msw";
import { BASE_RESPONSE } from "./general";

export const authHandlers = [
  graphql.mutation("Login", ({ variables }) => {
    const { email, password } = variables;

    if (email === "admin@rata.id" && password === "admin123") {
      return HttpResponse.json({
        data: {
          token: "gggqwebndsqdkqweDSassd/asd",
          user: {
            id: "1",
            name: "Kuntum Senda",
            role: "ADMIN",
            roleName: "Admin",
          },
        },
      });
    }

    return HttpResponse.json({
      errors: [{ message: "Email or password is wrong!" }],
    });
  }),
];
