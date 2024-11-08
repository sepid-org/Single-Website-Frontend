import {
  Divider,
  Paper,
  Typography,
  Box,
  Collapse,
  IconButton,
  Skeleton,
} from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import RoadMapType1 from 'commons/components/organisms/Roadmap/RoadMapType1';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Link } from 'commons/types/redux/Roadmap';
import { useGetFSMRoadmapActionQuery, useGetPlayerTransitedPathQuery } from 'apps/website-display/redux/features/roadmap/RoadmapSlice';
import { useParams } from 'react-router-dom';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import CourseMapViewMode from './Roadmap/CourseMapViewMode';

type FSMStateRoadMapPropsType = {
  currentNodeName: string;
};

const FSMStateRoadMap: FC<FSMStateRoadMapPropsType> = ({
  currentNodeName,
}) => {
  const fsmId = parseInt(useParams().fsmId);
  const { player } = useFSMStateContext();
  const [openRoadMap, setOpenRoadMap] = useState(true);
  const [lastTransitedNode, setLastTransitedNode] = useState<string>(currentNodeName);
  const [playerTransitedPath, setPlayerTransitedPath] = useState<Link[]>([]);
  const { data: FSMRoadmap } = useGetFSMRoadmapActionQuery({ fsmId });
  const { data: initialPlayerTransitedPath } = useGetPlayerTransitedPathQuery({ playerId: player.id });

  useEffect(() => {
    if (initialPlayerTransitedPath) {
      setPlayerTransitedPath(initialPlayerTransitedPath);
    }
  }, [initialPlayerTransitedPath])

  useEffect(() => {
    if (currentNodeName !== lastTransitedNode) {
      setPlayerTransitedPath([...playerTransitedPath, ({ source: lastTransitedNode, target: currentNodeName })]);
      setLastTransitedNode(currentNodeName);
    }
  }, [currentNodeName])

  return (
    <Box component={Paper}>
      <Typography variant='h4' padding={1}>
        <IconButton onClick={() => setOpenRoadMap(!openRoadMap)}>
          <ArrowDropDownCircleIcon sx={{ transform: openRoadMap ? 'rotate(-180deg)' : null }} />
        </IconButton>
        {'نقشه راه'}
      </Typography>
      <Collapse in={openRoadMap}>
        <Divider />
        {(!FSMRoadmap || !initialPlayerTransitedPath)
          ? <Skeleton variant='rectangular' height={200} sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
          : <RoadMapType1 currentNodeId={currentNodeName} firstStateTitle={FSMRoadmap.firstStateTitle} links={FSMRoadmap.links} highlightedPath={playerTransitedPath} />
        }
      </Collapse>
    </Box>
  );
};

export default FSMStateRoadMap;