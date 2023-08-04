import * as React from "react";
import { Menu as MuiMenu, MenuItem, IconButton } from "@mui/material";
import Fade from "@mui/material/Fade";
import { ReactComponent as OpenIcon } from "../../../assets/icons/open.svg";

export const MenuFiltered = ({ items, onClick }) => {
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
      <IconButton onClick={handleClick} style={{ cursor: "pointer" }}>
        <OpenIcon />
      </IconButton>
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
                handleClose();
                onClick(item);
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
