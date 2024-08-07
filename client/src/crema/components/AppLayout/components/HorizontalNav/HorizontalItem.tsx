import React from "react";
import { Icon, ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import clsx from "clsx";
import IntlMessages from "@crema/helpers/IntlMessages";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { RouterConfigData } from "@crema/types/models/Apps";
import { useSidebarContext } from "@crema/context/AppContextProvider/SidebarContextProvider";
import Link from "next/link";

type HorizontalItemProps = {
  item: RouterConfigData;
  nestedLevel?: number;
  dense?: boolean;
};

const HorizontalItem: React.FC<HorizontalItemProps> = (props) => {
  const { item, dense } = props;

  const router = useRouter();
  const active = isUrlInChildren(item, router.pathname);
  const { sidebarMenuSelectedBgColor, sidebarMenuSelectedTextColor } =
    useSidebarContext();

  function isUrlInChildren(parent: RouterConfigData, url: string) {
    if (!parent.children) {
      return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].children) {
        if (isUrlInChildren(parent.children[i], url)) {
          return true;
        }
      }

      if (
        parent.children[i].url === url ||
        url.includes(parent!.children![i].url!)
      ) {
        return true;
      }
    }

    return false;
  }

  return (
    <Link href={item.url as string} style={{ textDecoration: "none" }}>
      <ListItem
        className={clsx("navItemSubmenu", dense && "dense", {
          active: item.url === router.pathname,
        })}
        sx={{
          minHeight: 40,
          padding: "4px 12px",
          color: (theme) => theme.palette.text.primary,
          textDecoration: "none!important",
          minWidth: 160,
          "&.active": {
            backgroundColor: sidebarMenuSelectedBgColor,
            color: sidebarMenuSelectedTextColor + "!important",
            pointerEvents: "none",
            "& .list-item-text-primary": {
              color: "inherit",
            },
            "& .list-item-icon": {
              color: "inherit",
            },
          },
          "& .list-item-text": {
            padding: "0 0 0 16px",
          },
          "&.dense": {
            padding: "4px 12px",
            minHeight: 40,
            "& .list-item-text": {
              padding: "0 0 0 8px",
            },
          },
        }}
      >
        {item.icon && (
          <Icon
            sx={{
              color: active ? sidebarMenuSelectedTextColor : "action",
              mr: 3,
              fontSize: { xs: 16, xl: 18 },
            }}
          >
            {item.icon}
          </Icon>
        )}
        <ListItemText
          className="AppNavLinkTextSubmenu"
          primary={<IntlMessages id={item.messageId} />}
        />
        {item.count && (
          <Box ml={4}>
            <Badge
              badgeContent={item.count}
              sx={{
                color: item.color,
              }}
            />
          </Box>
        )}
      </ListItem>
    </Link>
  );
};

export default HorizontalItem;
