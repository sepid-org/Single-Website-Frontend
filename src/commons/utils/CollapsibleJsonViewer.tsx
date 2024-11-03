import { Card, CardContent, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CollapsibleJsonViewer = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpand = (path) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderValue = (value, path = '') => {
    if (value === null) {
      return (
        <Typography
          component="span"
          sx={{ color: 'text.disabled' }}
        >
          null
        </Typography>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <Typography
          component="span"
          sx={{ color: 'purple.500' }}
        >
          {value.toString()}
        </Typography>
      );
    }

    if (typeof value === 'number') {
      return (
        <Typography
          component="span"
          sx={{ color: 'primary.main' }}
        >
          {value}
        </Typography>
      );
    }

    if (typeof value === 'string') {
      return (
        <Typography
          component="span"
          sx={{ color: 'success.main' }}
        >
          "{value}"
        </Typography>
      );
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedItems.has(path);

      return (
        <Box>
          <Box
            onClick={() => toggleExpand(path)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover',
                borderRadius: 1,
              },
              px: 1,
            }}
          >
            {isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            <Typography
              component="span"
              sx={{ color: 'text.secondary' }}
            >
              Array[{value.length}]
            </Typography>
          </Box>
          {isExpanded && (
            <Box sx={{ ml: 4 }}>
              {value.map((item, index) => (
                <Box key={index} sx={{ my: 1 }}>
                  {renderValue(item, `${path}.${index}`)}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      );
    }

    if (typeof value === 'object') {
      const isExpanded = expandedItems.has(path);

      return (
        <Box>
          <Box
            onClick={() => toggleExpand(path)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover',
                borderRadius: 1,
              },
              px: 1,
            }}
          >
            {isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            <Typography
              component="span"
              sx={{ color: 'text.secondary' }}
            >
              Object
            </Typography>
          </Box>
          {isExpanded && (
            <Box sx={{ ml: 4 }}>
              {Object.entries(value).map(([key, val], index) => (
                <Box key={key} sx={{ my: 1 }}>
                  <Typography
                    component="span"
                    sx={{ color: 'error.main' }}
                  >
                    "{key}"
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ color: 'text.secondary' }}
                  >
                    : {' '}
                  </Typography>
                  {renderValue(val, `${path}.${key}`)}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      );
    }

    return String(value);
  };

  return (renderValue(data, 'root'))
};

export default CollapsibleJsonViewer;