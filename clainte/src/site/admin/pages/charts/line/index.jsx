import React from "react";
import LineChart from "../../../components/LineChart";
import { Header } from "../../../import";

import { useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Typography, Button } from "@mui/material";
const Line = () => {
  const navigate = useNavigate();

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">New Product</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="LINE CHART" subtitle="simple line chart" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box height="60vh">
          <LineChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Line;
