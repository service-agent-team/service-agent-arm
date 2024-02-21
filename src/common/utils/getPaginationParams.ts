export const getPaginationParams = (total: any) =>
  total
    ? {
        total,
        showTotal: (total: any) => `Total count: ${total}`,
      }
    : {};
