import React from "react";
import { Box } from "@mui/material";

function ButtonLayout({ icon: IconName, name, onClick }) {

    return(
        <Box component="button"
          onClick={onClick}
          style={{ 
            backgroundColor: '#daa520',
            color: 'black',
            padding: '10px 24px',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '15px',
            textTransform: 'none',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#fedc56';
            e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#daa520';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
          }}>
          <IconName />
          {name}
        </Box>
    )
}

export default ButtonLayout;