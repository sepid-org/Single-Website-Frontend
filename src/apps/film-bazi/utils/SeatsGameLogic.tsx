import { ObjectType } from "commons/types/models";

type WidgetLogic = Partial<ObjectType> & {

}

const widgetsLogic: WidgetLogic[] = [
  {
    name: 'filmbazi-stage1-seat1',
  },
  {
    name: 'filmbazi-stage1-seat2',
  },
  {
    name: 'filmbazi-stage1-seat3',
  },
]

export {
  widgetsLogic
};