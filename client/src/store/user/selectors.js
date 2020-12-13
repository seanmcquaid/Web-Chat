export const tokenSelector = ({ user }) => user?.token ?? null;
export const isOnlineSelector = ({ user }) => user?.isOnline ?? false;
