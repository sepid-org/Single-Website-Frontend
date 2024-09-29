import { ObjectLogicType } from "commons/types/models";
import { toast } from "react-toastify";

const objectLogics: ObjectLogicType[] = [
  {
    objectName: 'filmbazi-stage1-seat1',
    onClick: () => {
      toast.success('سلام!')
    },
    // component:<></>
  },
  {
    objectName: 'filmbazi-stage1-seat2',
  },
  {
    objectName: 'filmbazi-stage1-seat3',
  },
]

console.log(objectLogics)

export {
  objectLogics,
};