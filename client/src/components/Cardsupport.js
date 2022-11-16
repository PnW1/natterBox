import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import Dropdownn from './Dropdownn';


function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Cardsupport() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <h1 className='text-white text-center'>COMING SOON</h1>
      {/* <Box sx={{ width: '100%'  ,border: 1, borderColor: '#00ACEE',borderRadius:"10px", marginTop:"20px" }} >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab  sx={{color:"white"}} label="User Guide" {...a11yProps(0)} className='tabtext' />
          <Tab  sx={{color:"white"}} label="Diagnoses" {...a11yProps(1)}   className='tabtext' />
          <Tab  sx={{color:"white"}} label="Contact" {...a11yProps(2)}  className='tabtext'  />
          <Tab  sx={{color:"white"}} label="Settings" {...a11yProps(3)}   className='tabtext' />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      
      <Typography  >
      <Typography className='tabtext'>Guides</Typography>
      <Typography variant="p">
      <ol className='listtext text-white'>
        <li className='tabtext'>User Guide</li>
        <li className='tabtext'>Community onboarding Guide</li>
        <li className='tabtext'>Premium Plan</li>
      </ol> 
</Typography>
    
        </Typography>
        


     
     


      </TabPanel>
      <TabPanel value={value} index={1}>
      
      <Typography  >
      <Typography className='tabtext'> Collections</Typography>
    
        </Typography>
        


      
      
      </TabPanel>
      <TabPanel value={value} index={2}>
     
      <Typography  >
      <Typography className='tabtext'> Collections</Typography>
    
        </Typography>
        


     
      
      </TabPanel>
      <TabPanel value={value} index={3}>
     
      <Typography  >
      <Typography className='tabtext'> Collections</Typography>
    
        </Typography>
        

     
      
      </TabPanel>
    </Box> */}
    </>
  );
}
