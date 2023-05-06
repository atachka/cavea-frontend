export interface FetchStateType<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
