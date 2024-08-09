import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import type { Product } from "@/types";
import { BoxProps } from "@mui/material/Box";

type CustomTabPanelProps = {
  children: string,
  value: number,
  index: number
}
function CustomTabPanel({children, value, index,}:CustomTabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography 
            fontSize={{xs: '13px'}}  
            dangerouslySetInnerHTML={{__html: `${children}`}}
          />
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

function a11yProps(index:any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type ProductTabsProps = {
  description?: Product['description']
}

export default function ProductTabs({description}:ProductTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (newValue:number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={() => handleChange(value)}
          aria-label="basic tabs example"
        >
          {description && (
            <Tab label="Description" {...a11yProps(0)} />
          )}
        </Tabs>
      </Box>
      {description && (
        <CustomTabPanel value={value} index={0}>
         {description}
        </CustomTabPanel>
      )}
    </Box>
  );
}
