export interface LeftResult {
  data: null;
  errors: {
    message: string;
    statusCode: number;
  };
}

export interface RightResult<T> {
  data: T;
  errors: null;
}

export type Result<T> = LeftResult | RightResult<T>;
