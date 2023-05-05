import { App } from "vue";
import copy from "./modules/copy";
import waterMarker from "./modules/waterMarker";
import draggable from "./modules/draggable";
import longpress from "./modules/longpress";
import resizeElement from "./modules/resizeElement";

export const directivesList: any = {
  // Custom directives
  copy,
  waterMarker,
  draggable,
  longpress,
  resizeElement,
};
const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  },
};

export default directives;
