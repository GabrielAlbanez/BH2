import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, ListItemAvatar } from "@mui/material";
import Logo from "../../assets/imgs/Logo.png";

type Anchor = "top" | "left" | "bottom" | "right";

interface propsDrawer {
  coteudo: React.ReactNode;
  inten1?: React.ReactNode;
  textoI1?: string;
  inten2?: React.ReactNode;
  textoI2? : string;
  inten3?: React.ReactNode;
  textoI3?: string;
  inten4?: React.ReactNode;
  textoI4?: string;
  inten5?: React.ReactNode;
}

export default function MyDrawer({
  coteudo,
  inten1,
  textoI1,
  inten2,
  textoI2,
  inten3,
  textoI3,
  inten4,
  textoI4
}: propsDrawer) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                alt="Travis Howard"
                src={Logo}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
            <ListItemText primary={"Be Human"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{inten1}</ListItemIcon>
            <ListItemText primary={textoI1} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{inten2}</ListItemIcon>
            <ListItemText primary={textoI2} />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{inten3}</ListItemIcon>
            <ListItemText primary={textoI3} />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{inten4}</ListItemIcon>
            <ListItemText primary={textoI4} />
          </ListItemButton>
        </ListItem>


      </List>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{coteudo}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
