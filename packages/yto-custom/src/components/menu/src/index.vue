<script lang="ts">
import { ref, reactive, defineComponent, h, onMounted, watch, PropType } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { ElMenu, ElMenuItem, ElSubMenu, ElButton } from "element-plus";

interface MenuProps {
  name: string;
  path?: string;
  icon?: string | undefined;
  children?: [];
}

interface AnyProps {
  [propsName: string]: any;
}
export default defineComponent({
  name: "CMenu",
  props: {
    menus: {
      type: Array as PropType<MenuProps[]>,
      default: () => [],
    },
  },
  setup(props) {
    const router = useRouter();
    const isCollapse = ref(false);
    const defaultOpeneds: any = reactive([]);
    const defaultActive = ref();
    const sytoMenu = ref(null);
    const menuList2: AnyProps = reactive([]);
    const setMenuListFormatter = (data: any) => {
      data.forEach((item: AnyProps) => {
        if (item.path) {
          menuList2.push({ name: item.name, path: item.path });
        } else if (item.children && item.children.length) {
          setMenuListFormatter(item.children);
        }
      });
    };
    const onMenu = (item: MenuProps) => {
      item.path && router.push({ path: item.path });
    };
    const handleOpen = (key: string, keyPath: string) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string) => {
      console.log(key, keyPath);
    };
    const titleRender = (item: MenuProps) => {
      const arr = [h("span", null, item.name)];
      item.icon &&
        arr.unshift(
          h("i", {
            class: `my-icon ${item.icon}`,
          })
        );

      return arr;
    };
    const renderChildrenNode = (menus: any) => {
      return menus.map((item: any, index: number) => {
        if (!item.children || !item.children.length) {
          return h(
            ElMenuItem,
            {
              onClick: () => {
                onMenu(item);
              },
              index: item.path || item.name || index,
            },
            [h("div", { class: "my-menu-item-title" }, titleRender(item))]
          );
        } else {
          return h(
            ElSubMenu,
            {
              index: item.path || item.name,
            },
            {
              default: () => renderChildrenNode(item.children),
              title: () => titleRender(item),
            }
          );
        }
      });
    };
    onBeforeRouteUpdate((to) => {
      const bool = menuList2.some((item: AnyProps) => item.path === to.path);
      if (!bool) {
        defaultActive.value = "";
        defaultOpeneds.length = 0;
        const isOpenEle: any = document.querySelector(".el-submenu.is-opened>.el-submenu__title");
        isOpenEle && isOpenEle.click();
      } else {
        defaultActive.value = to.path;
      }
    });
    const renderMenu = () => {
      return [
        h(
          ElMenu,
          {
            class: "m-yto-menu",
            ref: sytoMenu,
            "on-open": (key: string, keyPath: string) => {
              handleOpen(key, keyPath);
            },
            "on-close": (key: string, keyPath: string) => {
              handleClose(key, keyPath);
            },
            uniqueOpened: true,
            collapse: isCollapse.value,
            defaultOpeneds: defaultOpeneds,
            defaultActive: defaultActive.value,
          },
          [renderChildrenNode(props.menus)]
        ),
        h(
          "div",
          {
            class: "collapse-btn",
          },
          [
            h("i", {
              class: "yto-icon-s-fold",
              size: 22,
              onClick: () => (isCollapse.value = !isCollapse.value),
            }),
          ]
        ),
      ];
    };
    onMounted(() => {
      defaultActive.value = location.pathname;
    });
    watch(
      () => props.menus,
      () => {
        setMenuListFormatter(props.menus);
      },
      { immediate: true, deep: true }
    );
    return () => {
      return h(
        "div",
        {
          class: "yt-menu-w",
        },
        renderMenu()
      );
    };
  },
});
</script>

<style lang="scss" scoped>
.yt-menu-w {
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: ccolumn;
}

.el-menu {
  border: none;
  box-shadow: 2px 0px 6px 0px rgb(0 21 41 / 12%);
  padding: 8px 0;
}

:deep(.el-sub-menu__title),
:deep(.el-submenu__title) {
  height: 40px;
}

.el-menu-item {
  height: 40px;
  line-height: 40px;
  display: flex;
}

.mn-icon {
  height: 14px;
  width: 14px;
}

.my-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-btn {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding-left: 16px;

  i {
    cursor: pointer;
  }
}

.el-menu-item {
  position: relative;
}

.el-sub-menu-collapse {
  width: auto !important;
}

:deep(.m-yto-menu:not(.el-menu--collapse)) {
  width: 240px;
}

:deep(.is-opened .el-submenu__title) {
  color: #2c3cd8 !important;
}

:deep(.el-submenu__title) {
  display: flex;
  height: 40px;
  align-items: center;
  i {
    padding-right: 10px;
  }
}

:deep(.el-menu-item.is-active) {
  background: rgba(44, 60, 216, 0.1);
}

.is-active-after {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  content: "";
  width: 2px;
  height: 100%;
  background: #444cff;
}

:deep(.el-menu-item.is-active)::after {
  @extend .is-active-after;
}

.my-menu-item-title {
  display: flex;

  & > i {
    padding-right: 10px;
  }
}

.el-menu-item:hover::after {
  @extend .is-active-after;
}

:deep(.is-active .my-icon) {
  color: #444cff;
}

.collapse-btn {
  gap: 8px;
  font-size: 14px;
  color: #9c9c9c;
  cursor: pointer;
}
</style>
