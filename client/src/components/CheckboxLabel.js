import { FormControlLabel, Checkbox } from "@mui/material";
import React from "react";

const CheckboxLabel = ({ checkboxName, isChecked, onChange }) => {
  return (
		<FormControlLabel
			control={
				<Checkbox
					checked={isChecked}
					onChange={onChange}
					name={checkboxName}
				/>
			}
			label={checkboxName}
		/>
	);
};

export default CheckboxLabel;