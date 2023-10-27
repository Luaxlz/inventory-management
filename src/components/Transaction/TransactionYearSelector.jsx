import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export const TransactionYearSelector = ({ handleTransactionYear, options }) => {
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    handleTransactionYear(year);
    handleCloseMenu();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpenMenu}
        sx={{ mb: 2, width: 100 }}>
        {selectedYear}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}>
        {options?.map((year) => (
          <MenuItem
            key={year}
            onClick={(e) => {
              e.stopPropagation();
              handleYearSelect(year);
            }}>
            {year}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
