import {AutoDevApiCar} from "./auto-dev.api-car.model";

export interface AutoDevApiResponse {
  hitCounts: number,
  promotedAggregations: any[],
  records: AutoDevApiCar[],
  totalCount: number,
  totalCountFormatted: string,
}
