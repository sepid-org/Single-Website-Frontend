import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import Iran from "commons/utils/iran";
import React, { Fragment } from "react";

export default function RegionSelector({ data, setData }) {
  return (
    <Fragment>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            marginBottom: '4px',
            fontSize: 14,
            fonWeight: 400,
          }}
        >
          استان
        </Typography>
        <FormControl
          required
          fullWidth
        >
          <Select
            value={data?.province || ''}
            onChange={(event) => { setData({ ...data, province: event.target.value }) }}
          >
            {Iran.Provinces.map((province) => (
              <MenuItem key={province.id} value={province.title}>
                {province.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            marginBottom: '4px',
            fontSize: 14,
            fonWeight: 400,
          }}
        >
          شهر
        </Typography>
        <FormControl
          required
          fullWidth
        >
          <Select
            disabled={!data?.province && !data?.city}
            value={data?.city || ''}
            onChange={(event) => { setData({ ...data, city: event.target.value }) }}
          >
            {Iran.Cities.filter((city) =>
              city.province_id == Iran.Provinces.find(province => province.title == data?.province)?.id)
              .map((city) => (
                <MenuItem key={city.id} value={city.title}>
                  {city.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Fragment>
  );
}