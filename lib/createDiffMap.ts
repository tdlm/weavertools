import { DataItem } from "@/components/DataList";

export type DataDiffItem = {
  key: string;
  value1: string | undefined;
  value2: string | undefined;
};

export default function createDiffMap(array1: DataItem[], array2: DataItem[]) {
  let commonDiff: DataDiffItem[] = [];
  let exclusiveToFirst: DataItem[] = [];
  let exclusiveToSecond: DataItem[] = [];

  if (array1.length === 0 || array2.length === 0) {
    return { commonDiff, exclusiveToFirst, exclusiveToSecond };
  }

  const array2Map = new Map(array2.map((item) => [item.key, item.value]));

  // Find differences and items exclusive to the first array
  array1.forEach((item) => {
    if (array2Map.has(item.key)) {
      const value2 = array2Map.get(item.key);
      if ("" !== item.value && item.value !== value2) {
        commonDiff.push({
          key: item.key,
          value1: item.value,
          value2: value2,
        });
      }
      array2Map.delete(item.key);
    } else {
      exclusiveToFirst.push(item);
    }
  });

  // Remaining items in array2Map are exclusive to the second array
  exclusiveToSecond = Array.from(array2Map.values()).map((value) => ({
    key: value?.toString() || "",
    value: value?.toString() || "",
  }));

  return { commonDiff, exclusiveToFirst, exclusiveToSecond };
}
