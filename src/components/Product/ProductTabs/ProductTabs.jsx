import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography fontSize={{xs: '13px'}}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel sx={{fontSize: '12px'}} value={value} index={0}>
        Quisque euismod egestas mi, id consectetur lacus dictum eu. Nullam eget
        nibh nec sem pellentesque cursus. Interdum et malesuada fames ac ante
        ipsum primis in faucibus. Nunc arcu augue, egestas in imperdiet sit
        amet, luctus ut elit. Mauris dapibus, diam sed bibendum vulputate, neque
        nibh consectetur velit, eget suscipit neque tellus a mi. Phasellus at
        lacus non lacus consectetur pretium. Nulla at rhoncus velit. Proin
        cursus erat a rutrum consectetur. Pellentesque at arcu at elit consequat
        sollicitudin. Duis nibh dolor, ullamcorper a justo sed, sagittis
        fermentum odio. Quisque imperdiet laoreet suscipit. Quisque vel est
        scelerisque, consequat velit vitae, dictum massa. Donec fermentum
        sagittis tristique. Nunc in dolor id massa vehicula fringilla. Curabitur
        sit amet finibus eros, vel mollis lacus.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
