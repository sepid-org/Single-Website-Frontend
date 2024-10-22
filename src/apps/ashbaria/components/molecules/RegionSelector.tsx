import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import Iran from "commons/utils/iran";
import React from "react";

export default function RegionSelector({ data, setData }) {
  return (
    <>
      <Grid item xs={12} md={6} sx={{ marginTop: "16px" }}>
        <Typography
          sx={{
            paddingBottom: "4px",
            gap: "10px",
            fontSize: "14px",
            fonWeight: "400",
            lineHeight: "20.88px",
            textAlign: "left"
          }}
        >
          استان
        </Typography>
        <FormControl
          required
          fullWidth
          sx={{
            padding: "0px 16px 0px 16px",
            gap: "10px",
            borderRadius: "8px",
            border: "1px",
            '& .MuiOutlinedInput-root': {
              height: "44px",
              width: "100%"
            }
          }}
        >
          <Select
            defaultValue={data.province || ''}
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
      <Grid item xs={12} md={6} sx={{ marginTop: "16px" }}>
        <Typography
          sx={{
            paddingBottom: "4px",
            gap: "10px",
            fontSize: "14px",
            fonWeight: "400",
            lineHeight: "20.88px",
            textAlign: "left"
          }}
        >
          شهر
        </Typography>
        <FormControl
          required
          fullWidth
          sx={{
            padding: "0px 16px 0px 16px",
            gap: "10px",
            borderRadius: "8px",
            border: "1px",
            '& .MuiOutlinedInput-root': {
              height: "44px",
              width: "100%"
            }
          }}
        >
          <Select
            disabled={!data.province && !data.city}
            value={data.city || ''}
            onChange={(event) => { setData({ ...data, city: event.target.value }) }}
          >
            {Iran.Cities.filter((city) =>
              city.province_id == Iran.Provinces.find(province => province.title == data.province)?.id)
              .map((city) => (
                <MenuItem key={city.id} value={city.title}>
                  {city.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

    </>
  );
}