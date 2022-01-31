import { Avatar, TableRow, TableCell, Chip, IconButton, Icon, Typography } from "@mui/material";
import React from "react";
import { User } from "../../interfaces/UserInterfaces";
import { makeStyles } from "@mui/styles";
import moment from 'moment'


interface Props {
  user: User;
  columnsGrid: string
}

const useStyles = makeStyles({
  tableCell: {
    color: "#6B636B",
    display:"grid",
    alignContent:"center",
    fontFamily: "'Montserrat',  sans-serif",
  },
});

const UsersTableRow: React.FC<Props> = ({ user, columnsGrid }) => {
  const classes = useStyles();

  return (
    <TableRow
      sx={{
        display: "grid",
        gridTemplateColumns: columnsGrid,
      }}
    >
      <TableCell className={classes.tableCell}>
        <Avatar alt={user.displayName} src={user.profileImageUrl}></Avatar>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Typography sx={{fontWeight:"bold"}}>{user.displayName}</Typography>
        <Typography>{user.email}</Typography>
      </TableCell>

      <TableCell align="center" className={classes.tableCell}>
        <Typography>{user.role}</Typography>
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <Typography>{moment(user.lastLogin).format("DD.MM.YYYY")}</Typography>
      </TableCell>
      <TableCell align="center">
        {user.role&&<Chip label="Activ" sx={{color:"green", borderColor:"green", width:"120px"}} variant="outlined" />}
        {!user.role&&<Chip label="In asteptare" sx={{color:"orange", borderColor:"orange", width:"120px"}} variant="outlined" />}
      </TableCell>
      <TableCell align="center">
          <IconButton>
              <Icon>more_vert</Icon>
          </IconButton>
      </TableCell>

    </TableRow>
  );
};

export default UsersTableRow;
