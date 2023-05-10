// ** Reducers Imports
import navbar from "./navbar";
import layout from "./layout";
import auth from "./authentication";
import todo from "@src/views/apps/todo/store";
import users from "@src/views/apps/user/store";
import books from "@src/views/apps/BookAdmin/store";
import email from "@src/views/apps/email/store";
import kanban from "@src/views/apps/kanban/store";
import invoice from "@src/views/apps/invoice/store";
import ecommerce from "@src/views/apps/ecommerce/store";
import dataTables from "@src/views/tables/data-tables/store";
import permissions from "@src/views/apps/roles-permissions/store";

import clubs from './clubs';
import calendar from '../views/clubs-management/club-details/calendar-tab/store'
import chat from './chat';
import appChat from '../views/clubs-management/chat/store';
import messenger from './messenger';

const rootReducer = {
  auth,
  todo,
  email,
  users,
  books,
  kanban,
  navbar,
  layout,
  invoice,
  ecommerce,
  dataTables,
  permissions,
  clubs,
  chat,
  messenger,
  calendar,
  appChat,
};

export default rootReducer;
