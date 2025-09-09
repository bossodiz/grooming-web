import { MenuItemType } from '@common/menu.meta';

export const findAllParent = (
  menuItems: MenuItemType[],
  menuItem: any,
): any => {
  let parents = [];
  const parent = findMenuItem(menuItems, menuItem['parentKey']);

  if (parent) {
    parents.push(parent['key']);
    if (parent['parentKey'])
      parents = [...parents, ...findAllParent(menuItems, parent)];
  }
  return parents;
};

export const findMenuItem = (
  menuItems: MenuItemType[],
  menuItemKey: string,
): any => {
  if (menuItems && menuItemKey) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      var found = findMenuItem(menuItems[i].children!, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};

export const formatPhone = (phone?: string): string => {
  if (!phone) return '';
  // ลบทุกตัวที่ไม่ใช่ตัวเลขออก
  const digits = phone.replace(/\D/g, '');
  // ถ้าจำนวนตัวเลขไม่ใช่ 10 ตัว ก็คืนค่าเดิม
  if (digits.length !== 10) return phone;
  // จัดรูปแบบ xxx-xxx-xxxx
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};
