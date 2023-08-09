import React from 'react';
import { Box, Breadcrumbs, Button, Typography, TextField, Divider } from '@mui/material';
import './styles.css';
import Header from '../../../../../components/Header';
import { Formik } from 'formik';
import SpreadSheet from "./SpreadSheet";
import "./styles.css";






const Csp = () => {
  // form X
  const initialValues = {
    apioutput: '',
    apiinput: '',
  }
  const handleFormSubmit= ()=>{

  }

  return (
    <div>
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
          <Typography color="text.primary">Cut Optimization</Typography>

          </Breadcrumbs>
        {/* <DataGrid columns={columns} rows={rows} onRowsChange={setRows} /> */}
        {/* <Sheet/> */}


        </Box>
        <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="CUT OPTIMIZATION" subtitle="Create a New User Profile" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
      <SpreadSheet/>



      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
     <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box className="flex flex-col gap-4 drop-shadow-lg  rounded-lg">
              <Box className="flex flex-col gap-4 px-4 py-2 ">
                <TextField
                  fullWidth
                  variant="filled"
                  type="apioutput"
                  label="API output"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.apioutput}
                  name={'apioutput'}
                  error={!!touched.apioutput && !!errors.apioutput}
                  helperText={touched.apioutput && errors.apioutput}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="last_name"
                  label="API input"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.apiinput}
                  name={'apiinput'}
                  error={!!touched.apiinput && !!errors.apiinput}
                  helperText={touched.apiinput && errors.apiinput}
                />

                <Button
                  type="submit"
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className="w-full py-2"
                >
                  Register
                </Button>

              </Box>
            </Box>
            <Divider />
          </form>
        )}
      </Formik>


    </Box>

        </Box>
        </Box>

    </div>
  )
}

export default Csp;