import { Menu, MenuItem, Button } from "@mui/material";
import { useState } from "react";

const getMonthName = (monthIndex) => {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return monthNames[monthIndex];
};

export const TransactionMonthSelector = ({
  handleTransactionMonth,
  options,
}) => {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex);
    handleTransactionMonth(monthIndex);
    handleCloseMenu();
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpenMenu}
        sx={{ mb: 2, width: 100 }}>
        {getMonthName(selectedMonth)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}>
        {options?.map((monthIndex) => (
          <MenuItem
            key={monthIndex}
            onClick={(e) => {
              e.stopPropagation();
              handleMonthSelect(monthIndex);
            }}>
            {getMonthName(monthIndex)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
