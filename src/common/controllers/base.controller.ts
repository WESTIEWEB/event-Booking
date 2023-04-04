export abstract class BaseController {
  public success<T>(payload: T) {
    return {
      status: 'success',
      ...payload,
    };
  }
}
