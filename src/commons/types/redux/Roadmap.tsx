export type RoadmapInitialStateType = {
  playerTransitedPath: Link[];
  FSMRoadmap: FSMRoadmapType;
}

export type FSMRoadmapType = {
  firstStateTitle: string;
  links: Link[],
}

export type Link = {
  source: string;
  target: string;
}

export type Node = {
  id: string;
  color?: string;
  x?: number;
  y?: number;
};