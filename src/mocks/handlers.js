import { rest } from "msw";
import { pages } from "./data/daily";

export const handlers = [
  rest.get(
    "http://usw2op19s08w:8080/v2_0/ReportService/profiles/*/reports/*/",
    (req, res, ctx) => {
      const date = req.url.searchParams.get("start_period");
      const day = date.match(/\d+$/).pop();

      if (day <= 5) {
        return res(ctx.json(pages[day]));
      }
      return res(ctx.json({}));
    }
  ),
];
