export const ROUTES = {
  home: "/",
  signIn: "/auth/signIn",
  singUp: "/auth/signUp",
  task: (taskId: string) => `/tasks/${taskId}`,
};
