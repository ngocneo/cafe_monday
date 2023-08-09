import React from "react";
import { useTheme } from "@emotion/react";

import {
  Box,
  Typography,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { tokens } from "../../../../../theme";

const ShoppingForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formattedName = (type, field) => `${type}.${field}`;

  return (
    <Box className="flex flex-col justify-between h-full w-full gap-4 p-4">
      <FormControl>
        <FormLabel id="shipping-type-radio-buttons-group-label">
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left mb-2`}
          >
            Shipping Type
          </Typography>
        </FormLabel>

        <RadioGroup
          labelled="shipping-type-radio-buttons-group-label"
          defaultValue="fulfilled_by_seller"
          name={formattedName("shoppingType", "type")}
          className="flex h-full w-full gap-4 "
        >
          <Box className="flex flex-col">
            <FormControlLabel
              value="fulfilled_by_seller"
              control={<Radio color="secondary" />}
              label="Fulfilled by Seller"
              name={formattedName("shoppingType", "type")}
            />
            <Typography className="ml-[25px]" variant="p">
              You’ll be responsible for product delivery. Any damage or delay
              during shipping may cost you a Damage fee.
            </Typography>
          </Box>
          <Box className="flex flex-col">
            <FormControlLabel
              value="fulfilled_by_phoenix"
              control={<Radio color="secondary" />}
              label="Fulfilled by Phoenix"
              name={formattedName("shoppingType", "type")}
            />
            <Typography className="ml-[25px]" variant="p">
              Your product, Our responsibility. For a measly fee, we will handle
              the delivery process for you.
            </Typography>
          </Box>
        </RadioGroup>
      </FormControl>
      <Typography>
        See our Delivery terms and conditions for details.
      </Typography>
    </Box>
  );
};

export default ShoppingForm;
