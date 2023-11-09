const getItem = (label: string, key: string, icon: any, children: any) => ({
  key,
  icon,
  label,
  children,
});

export const generateAllMenuItems = (list: any) =>
  list?.map((item: any) =>
    getItem(
      item.label,
      item.key,
      (item.icon && item.icon) || undefined,
      (item.children && generateAllMenuItems(item.children)) || undefined,
    ),
  );
