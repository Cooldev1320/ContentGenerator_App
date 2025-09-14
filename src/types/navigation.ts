// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Editor: { projectId?: string };
  Projects: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Create: undefined;
  Templates: undefined;
  History: undefined;
  Settings: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
