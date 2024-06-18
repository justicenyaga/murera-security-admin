import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

import colors from "../config/colors";

const Sidebar = ({ children, menuItems, selectedItem, selectItemHandler }) => {
  return (
    <List
      sx={{
        border: "1px solid black",
        borderRadius: 3,
        height: "fit-content",
        mr: 2,
        padding: 1,
        "& .MuiListItemButton-root.Mui-selected": {
          bgcolor: "white",
        },
        "& .MuiListItemButton-root": {
          py: 0,
        },
      }}
    >
      {menuItems.map((item) => (
        <ListItemButton
          key={item.id}
          selected={selectedItem === item.id}
          onClick={() => selectItemHandler(item)}
          sx={{ my: 1 }}
        >
          {item.icon && (
            <ListItemIcon>
              <item.icon
                sx={{
                  color:
                    selectedItem === item.id ? colors.primary : colors.medium,
                }}
              />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              whiteSpace: "nowrap",
              color: selectedItem === item.id ? colors.primary : colors.medium,
            }}
          />
        </ListItemButton>
      ))}
      {children}
    </List>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node,
  menuItems: PropTypes.array.isRequired,
  selectedItem: PropTypes.number.isRequired,
  selectItemHandler: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Sidebar;
