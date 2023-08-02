import * as React from "react";
import { Menu as MuiMenu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";
import { ReactComponent as ControlsIcon } from "../../../assets/icons/controls.svg";

export const Menu = ({ items, id }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ControlsIcon onClick={handleClick} style={{ cursor: "pointer" }} />
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {items.map((item) => {
          return (
            <MenuItem
              key={Math.random()}
              onClick={() => {
                item.onClick(id);
                handleClose();
              }}
            >
              {item.value}
            </MenuItem>
          );
        })}
      </MuiMenu>
    </div>
  );
};
