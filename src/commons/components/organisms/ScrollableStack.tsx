import { useRef, useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import React from 'react';

function ScrollableStack({ children }) {
  const stackRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    let timeoutIds = [];
    const checkScrollable = () => {
      if (stackRef.current) {
        setIsScrollable(stackRef.current.scrollWidth > stackRef.current.clientWidth);
      }
    };

    const scheduleChecks = (intervals, index = 0) => {
      if (index < intervals.length) {
        const timeoutId = setTimeout(() => {
          checkScrollable();
          scheduleChecks(intervals, index + 1);
        }, intervals[index] * 1000);
        timeoutIds.push(timeoutId);
      }
    };

    // Initial check and schedule subsequent checks
    checkScrollable();
    const intervals = [1, 2, 4, 8, 16];
    scheduleChecks(intervals);

    // Cleanup timeouts
    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return (
    <Stack
      ref={stackRef}
      spacing={2}
      direction={'row-reverse'}
      overflow={'auto'}
      sx={{
        width: '100%',
        borderRadius: '8px',
        paddingBottom: isScrollable ? 1 : 0,
        '::-webkit-scrollbar': {
          height: '8px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#b0bec5',
          borderRadius: '8px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#90a4ae',
        },
      }}
    >
      {children}
    </Stack>
  );
}

export default ScrollableStack;
