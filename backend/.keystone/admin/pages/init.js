import { getInitPage } from '@keystone-6/auth/pages/InitPage';

const fieldPaths = ["userName","userType","email","password"];

export default getInitPage({"listKey":"User","fieldPaths":["userName","userType","email","password"],"enableWelcome":true});
