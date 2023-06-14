import { Autocomplete, TextField } from "@mui/material";

//array for combo box
const topFoods = [
    {label: 'Pizza'},
    {label: 'Pasta'},
    {label: 'Pie'},
    {label: 'Cake'},
    {label: 'Bread'},
    {label: 'Soup'},
    {label: 'Salad'},
    {label: 'Sandwich'},
    {label: 'Beef'},
    {label: 'Chicken'},
    {label: 'Pork'},
    {label: 'Fish'},
    {label: 'Ice Cream'},
    {label: 'Candy'},
    {label: 'Yougurt'},
    {label: 'Chili'},
    {label: 'Seafood'},
    {label: 'Sushi'},
  ];

export function AutoCompleteFoods() {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={topFoods}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Genre" />}
      />
    );
}