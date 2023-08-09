import React, { useState, useEffect } from 'react'
import { useTheme } from '@emotion/react'
import {
  Box,
  Button,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  FormLabel,
  Select,
  FormGroup,
  CircularProgress,
  Chip,
  OutlinedInput,
} from '@mui/material'

import { useGetAllVariantsQuery } from '../../../../../features/services/variantApiSlice'
import { tokens } from '../../../../../theme'
import useAlert from '../../../../../components/ui/useAlert'
import Model from '../../../../../components/ui/Model'
import CreateEditVariant from '../../settings/specification/components/CreateEditVariant'
import VariantList from '../../settings/specification/components/VariantList'
const VariantsForm = ({
  values,
  errors,
  touched,
  handleBlur,
  setFieldValue,
  initialValues,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [CustomAlert, setMessages] = useAlert()
  const [openModel, setOpenModel] = useState(false)
  const [modelTitle, setModelTitle] = useState('')
  const [selected, setSelected] = useState([])
  const [editingVariant, setEditingVariant] = useState(undefined)
  const [creatingVariant, setCreatingVariant] = useState(undefined)
  const { data: variants, isFetching: variantsIsFetching } =
    useGetAllVariantsQuery()

  useEffect(() => {
    if (initialValues?.variants && variants) {
      setSelected(
        initialValues?.variants?.map(({ variantLabel }) => {
          let selectedOptions = variants.find(
            (variantOption) => variantOption.label === variantLabel
          )

          return selectedOptions
        })
      )
    }
  }, [initialValues?.variants, variants])

  const getOptions = (variantLabel) => {
    let variantOptions = values.variants.find(
      (variant) => variant.variantLabel === variantLabel
    )
    if (variantOptions?.options) {
      return variantOptions?.options //.map((option) => option.label);
    } else {
      return []
    }
    // return variantOptions?.options ? variantOptions?.options : [];
  }

  const handleOpenModel = () => {
    setModelTitle('Add Variants')
    setOpenModel(true)
  }
  const handleRemove = (variantId) => {
    let selected_variant = variants?.find((variant) => variant.id === variantId)
    setSelected((prev) => prev.filter((variant) => variant.id !== variantId))
    setFieldValue(
      'variants',
      values.variants.filter(
        (variant) => variant.variantLabel !== selected_variant.label
      )
    )
  }

  const handleChangeOption = (variantLabel, options) => {
    if (
      values.variants?.find((variant) => variant.variantLabel === variantLabel)
    ) {
      setFieldValue(
        'variants',
        values.variants.map((variant) => {
          if (variant?.variantLabel === variantLabel) {
            return {
              variantLabel,
              options,
            }
          } else {
            return variant
          }
        })
      )
    } else {
      setFieldValue('variants', [
        ...values.variants,
        {
          variantLabel,
          options,
        },
      ])
    }
  }
  const handleSetVariant = (variantId) => {
    let selected_variant = variants?.find((variant) => variant.id === variantId)
    if (selected.find((variant) => variant.id === variantId)) {
      setSelected((prev) => prev.filter((variant) => variant.id !== variantId))
    } else {
      setSelected((prev) => [...prev, selected_variant])
    }
  }

  const handleAddVariant = () => {
    setCreatingVariant({
      label: '',
      options: [],
    })
    setEditingVariant(undefined)
  }

  return (
    <>
      <Model
        width="md"
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle={modelTitle}
      >
        {openModel && (
          <>
            <CustomAlert />
            {creatingVariant || editingVariant ? (
              <CreateEditVariant
                creatingVariant={creatingVariant}
                setCreatingVariant={setCreatingVariant}
                editingVariant={editingVariant}
                setEditingVariant={setEditingVariant}
                handleAddVariant={handleAddVariant}
                setMessages={setMessages}
              />
            ) : !variantsIsFetching ? (
              <VariantList
                variants={variants}
                selected={selected}
                setEditingVariant={setEditingVariant}
                handleSetVariant={handleSetVariant}
                handleAddVariant={handleAddVariant}
                setMessages={setMessages}
              />
            ) : (
              <Box className="h-full w-full flex justify-center items-center">
                <CircularProgress />
              </Box>
            )}
          </>
        )}
      </Model>
      <Box
        backgroundColor={colors.primary[400]}
        className="drop-shadow-lg  rounded-lg p-4"
      >
        <FormControl
          className="h-full w-full"
          component="fieldset"
          variant="standard"
        >
          <FormLabel>
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-xl md:text-2xl  text-left my-4`}
            >
              Variants
            </Typography>
          </FormLabel>
          <FormGroup className="w-full grid grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-2">
            {!variantsIsFetching ? (
              selected.length ? (
                selected?.map((variant, index) => (
                  <Box
                    key={`variant-${variant.label}-${index}`}
                    className="w-full"
                  >
                    <Box className="w-full flex justify-between px-1 gap-2">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        {variant.label}
                      </Typography>
                      <Typography
                        onClick={() => handleRemove(variant.id)}
                        variant="h6"
                        fontWeight="bold"
                        className={`my-2 cursor-pointer hover:text-green-400`}
                        color={colors.blueAccent[400]}
                      >
                        remove
                      </Typography>
                    </Box>
                    <FormControl variant="filled" className="w-full">
                      <InputLabel id="category-select-label">
                        {variant.label}
                      </InputLabel>
                      <Select
                        fullWidth
                        multiple
                        color="secondary"
                        labelId="category-select-label"
                        id="category-select"
                        variant="filled"
                        name={`options`}
                        value={getOptions(variant.label)}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 0.5,
                            }}
                          >
                            {selected?.map((value, index) => (
                              <Chip key={`${value}-${index}`} label={value} />
                            ))}
                          </Box>
                        )}
                        onBlur={handleBlur}
                        onChange={(e) =>
                          handleChangeOption(variant?.label, e.target.value)
                        }
                        error={!!touched?.options && !!errors?.options}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {variant.options?.map((option, index) => (
                          <MenuItem
                            key={`option-${option}-${index}`}
                            value={option.label}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ))
              ) : (
                <Typography>No Variant</Typography>
              )
            ) : (
              <Box className="w-full flex items-center justify-center h-full min-h-40">
                <CircularProgress color="secondary" />
              </Box>
            )}
          </FormGroup>
        </FormControl>
        <Button
          onClick={handleOpenModel}
          type="button"
          color="secondary"
          variant="outlined"
          className={`w-full mt-4`}
        >
          Add another Variant
        </Button>
      </Box>
    </>
  )
}

export default VariantsForm
