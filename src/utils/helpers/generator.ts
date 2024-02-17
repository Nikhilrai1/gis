import { UseFormSetError } from "react-hook-form";
import { modifyKeyword } from "./validator";
import { DynamicObjectType, StringArrayType } from "@/typing";


export const columnGenerator = () => {};

export const tableHeaderColumnGenerator = (
  initialArray: StringArrayType,
  dynamicObject: DynamicObjectType,
  index?: number
) => {
  let workingArray = initialArray;
  const insertIndex = !!index ? index : -1;

  const dynamicObjectArray = Object.keys(dynamicObject);

  dynamicObjectArray.forEach((key, idx) => {
    if (key.toLowerCase() !== "_id" && key.toLowerCase() !== "id" && idx <= 4) {
      const insertKeyword = modifyKeyword(key);
      workingArray.splice(insertIndex, 0, insertKeyword);
    }
  });

  return workingArray;
};

export const dynamicColumnSelectErrorGenerator = (
  dynamicColumn: string[],
  setError: UseFormSetError<any>,
  min = 3,
  max = 5
) => {
  if (dynamicColumn.length < min) {
    setError("dynamicColumn", {
      type: "manual",
      message: `Must select atleast ${min} options.`,
    });
    return true;
  } else if (dynamicColumn.length > max) {
    setError("dynamicColumn", {
      type: "manual",
      message: `Must select atmost ${max} options`,
    });
    return true;
  }
  return false;
};
