import React from 'react'
import { Box, TextField, Button, Divider, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CloseIcon from '@mui/icons-material/Close'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import * as yup from 'yup'
import dayjs from 'dayjs'
import { tokens } from '../../../../../../theme'
import {
  useAddDiscountMutation,
  useUpdateDiscountMutation,
} from '../../../../../../features/services/discountApiSlice'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'

const CreateEditDiscount = ({
  creatingDiscount,
  editingDiscount,
  setCreatingDiscount,
  setEditingDiscount,
  setMessages,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { enqueueSnackbar } = useSnackbar()
  const [addDiscount] = useAddDiscountMutation()
  const [updateDiscount, { isLoading: isUpdating }] =
    useUpdateDiscountMutation()

  const getDate = (stringDate) => {
    if (stringDate) {
      const [day, month, year] = stringDate.split('-')
      return new Date(year, month - 1, day)
    } else {
      return new Date()
    }
  }
  const discount = creatingDiscount || editingDiscount
  const initialDiscountValues = {
    ...discount,
    start_date: dayjs(getDate(discount.start_date)),
    end_date: dayjs(getDate(discount.end_date)),
  }
  const handleSaveDiscount = (values) => {
    const postData = {
      ...values,
      start_date: values.start_date.format('DD-MM-YYYY'),
      end_date: values.end_date.format('DD-MM-YYYY'),
    }
    if (creatingDiscount) {
      addDiscount({
        post: postData,
      }).then((data) => {
        if (data?.error?.status) {
          Object.keys(data.error.data).forEach((key) => {
            setMessages((prev) => [
              ...prev,
              { id: key, variant: 'error', description: data.error.data[key] },
            ])
          })
        } else {
          enqueueSnackbar(
            `Discount -> ${postData.name} is created successfully!`,
            {
              variant: 'success',
            }
          )
        }
      })
    } else if (editingDiscount) {
      updateDiscount({
        post: postData,
      }).then((data) => {
        if (data?.error?.status) {
          Object.keys(data.error.data).forEach((key) => {
            setMessages((prev) => [
              ...prev,
              { id: key, variant: 'error', description: data.error.data[key] },
            ])
          })
        } else {
          enqueueSnackbar(
            `Discount -> ${postData.name} is updated successfully!`,
            {
              variant: 'success',
            }
          )
        }
      })
    }
    setCreatingDiscount(undefined)
    setEditingDiscount(undefined)
  }

  const handleCancel = () => {
    setCreatingDiscount(undefined)
    setEditingDiscount(undefined)
  }
  return (
    <>
      <Formik
        initialValues={initialDiscountValues}
        validationSchema={newDiscountSchema}
        onSubmit={handleSaveDiscount}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <Box
            borderColor={colors.grey[500]}
            className="flex flex-col gap-4 border p-4 rounded-md"
          >
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl text-left`}
            >
              Discount
            </Typography>
            <TextField
              size="small"
              color="secondary"
              fullWidth
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              label="Name"
              onBlur={handleBlur}
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DemoItem className="w-full" label="Start Date">
                  <DatePicker
                    fullWidth
                    disablePast
                    format="DD/MM/YYYY"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    //   value={values.start_date}
                    defaultValue={initialDiscountValues.start_date}
                    onChange={(newVal) => setFieldValue('start_date', newVal)}
                  />
                  {!!touched.start_date && !!errors.start_date && (
                    <>
                      <Divider color="error" className="h-[2px] mt-[-1px]" />
                      <Typography className="text-red-500">
                        {touched.start_date && errors.start_date}
                      </Typography>
                    </>
                  )}
                </DemoItem>
                <DemoItem label="End Date">
                  <DatePicker
                    fullWidth
                    disablePast
                    format="DD/MM/YYYY"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    //   value={values.end_date}
                    defaultValue={initialDiscountValues.end_date}
                    onChange={(newVal) => setFieldValue('end_date', newVal)}
                  />
                  {!!touched.end_date && !!errors.end_date && (
                    <>
                      <Divider color="error" className="h-[2px] mt-[-1px]" />
                      <Typography className="text-red-500">
                        {touched.end_date && errors.end_date}
                      </Typography>
                    </>
                  )}
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>

            <TextField
              size="small"
              color="secondary"
              fullWidth
              type="number"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              label="Amount"
              onBlur={handleBlur}
              error={!!touched.amount && !!errors.amount}
              helperText={touched.amount && errors.amount}
            />
            <Box className="flex gap-2">
              <Button
                type="button"
                color="secondary"
                variant="outlined"
                startIcon={<SaveAsIcon />}
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                type="button"
                color="warning"
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={handleCancel}
              >
                cancel
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </>
  )
}
const newDiscountSchema = yup.object().shape({
  name: yup.string().required('require'),
  amount: yup.number().required('require'),
  start_date: yup.date().required('require'),
  end_date: yup.date().required('require'),
})
export default CreateEditDiscount
