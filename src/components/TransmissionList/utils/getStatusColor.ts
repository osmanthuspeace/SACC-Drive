export const getStatusColor = (status: string) => {
  const statusColor = {
    uploading: "blue",
    completed: "green",
    error: "red",
    paused: "orange",
    waiting: "geekblue",
    canceled: "default",
  };
  return statusColor[status as keyof typeof statusColor] || "default";
};
