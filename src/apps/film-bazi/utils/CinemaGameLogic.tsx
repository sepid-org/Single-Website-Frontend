import { ObjectLogicType } from "commons/types/models";
import { toast } from "react-toastify";


const hoverOnMouseEnter = (target) => {
  target.style.transform = 'scale(1.05)';
  target.style.transition = 'all 0.1s ease';
  target.style.cursor = 'pointer';
}

const hoverOnMouseLeave = (target) => {
  target.style.transform = 'scale(1)';
  target.style.transition = 'all 0.1s ease';
  target.style.cursor = 'default';
}

const objectLogics: ObjectLogicType[] = [
  {
    objectName: 'filmbazi-stage1-seat1',
    onClick: (e) => {
      toast.success('سلام!')
    },
    onMouseEnter: (e) => {
      const target = e.currentTarget;
      hoverOnMouseEnter(target);
    },
    onMouseLeave: (e) => {
      const target = e.currentTarget;
      hoverOnMouseLeave(target);
    },
  },
  {
    objectName: 'filmbazi-stage1-seat2',
    onMouseEnter: (e) => {
      const target = e.currentTarget;
      hoverOnMouseEnter(target);
    },

    onMouseLeave: (e) => {
      const target = e.currentTarget;
      hoverOnMouseLeave(target);
    },
  },
  {
    objectName: 'filmbazi-stage1-seat3',
    onMouseEnter: (e) => {
      const target = e.currentTarget;
      hoverOnMouseEnter(target);
    },

    onMouseLeave: (e) => {
      const target = e.currentTarget;
      hoverOnMouseLeave(target);
    },
  },
]

export {
  objectLogics,
};