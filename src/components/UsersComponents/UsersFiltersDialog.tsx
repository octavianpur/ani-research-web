import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Icon,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import "./UsersFiltersDialog.css";
import { CheckBoxSharp } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: any;
  onFilters: any;
}

interface Filters {
  statusFilters: number[],
  roleFilters: number[],
  lastDateFilter:{
    logged: number[],
    period: string
  }
}

const UsersFiltersDialog: React.FC<Props> = ({ open, onClose, onFilters }) => {

  const [filters, setFilters] = useState<Filters>({statusFilters:[], roleFilters:[], lastDateFilter:{logged:[], period:""}});
  const handleClose = () => {};

  const handleStatuses = (e:any) =>{
    const statuses =  filters.statusFilters.includes(e.target?.value) ? filters.statusFilters.filter(item=>item!==e.target.value) : [...filters.statusFilters, e.target.value];
    setFilters({...filters, statusFilters: [...statuses]});


  }

  const handleRoles = (e:any) =>{
    console.log(e.target?.value)
  }

  const handleWereLogged = (e:any) =>{
    console.log(e.target?.value)
  }

  useEffect(()=>{
    console.log(filters);
  },[filters])


  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "600px",
        },
      }}
      onClose={onClose}
      open={open}
    >
      <DialogTitle
        sx={{
          color: "#6B636B",
          fontSize: "17px",
          borderBottom: "1px solid #bdbdbd",
        }}
      >
        <Icon sx={{ fontSize: "16px", marginRight: "16px" }}>tune</Icon>
        Filtre utilizatori
        <IconButton
          sx={{ position: "absolute", right: "8px", top: "8px" }}
          onClick={onClose}
        >
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="filters-section">
          <h5>filtreaza utilizatori dupa status</h5>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <FormControlLabel
              value = {0}
              onChange={handleStatuses}
              control={<Checkbox />}
              label="in asteptare"
            ></FormControlLabel>
            <FormControlLabel
              value = {1}
              onChange={handleStatuses}
              control={<Checkbox />}
              label="activi"
            ></FormControlLabel>
          </div>
        </div>
        <div className="filters-section">
          <h5>filtreaza utilizatori dupa rol</h5>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <FormControlLabel
              value = {250}
              onChange={handleRoles}
              control={<Checkbox />}
              label="admin"
            ></FormControlLabel>
            <FormControlLabel
              value = {150}
              onChange={handleRoles}
              control={<Checkbox />}
              label="coordinator"
            ></FormControlLabel>
            <FormControlLabel
              value = {70}
              onChange={handleRoles}
              control={<Checkbox />}
              label="reviewer"
            ></FormControlLabel>
            <FormControlLabel
              value = {10}
              onChange={handleRoles}
              control={<Checkbox />}
              label="researcher"
            ></FormControlLabel>
          </div>
        </div>
        <div className="filters-section">
          <h5>filtreaza utilizatori dupa ultima logare</h5>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div className="logged-status-group">
              <FormControlLabel
                control={<Checkbox />}
                label="s-au logat"
                value = {1}
                onChange={handleWereLogged}
              ></FormControlLabel>
              <FormControlLabel
                control={<Checkbox />}
                label="nu s-au logat"
                value = {0}
                onChange={handleWereLogged}
              ></FormControlLabel>
            </div>

            <FormControl fullWidth>
              <InputLabel>alege perioada</InputLabel>
              <Select defaultValue="" label="alege perioada">
                <MenuItem value={0}>ultima saptamana</MenuItem>
                <MenuItem value={1}>ultima luna</MenuItem>
                <MenuItem value={2}>ultimile 3 luni</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button>Filtreaza</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersFiltersDialog;
