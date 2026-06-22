export const successResponse = (data: unknown, message: string) => ({
  success: true,
  message,
  data,
});
