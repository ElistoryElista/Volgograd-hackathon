import {
  useGetAllPlaceCategoriesQuery,
  useGetAllPlacesQuery,
} from "@/entities";
import { TPlace } from "@/shared/model/types";
import { useEffect, useState } from "react";

interface IProps {
  setPlacesData: (data: TPlace[]) => void;
  setIsNothing: (status: boolean) => void;
  isNothing: boolean;
}

export const FilterByCategory: React.FC<IProps> = ({
  setPlacesData,
  setIsNothing,
  isNothing,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>(
    "filters[$and][0][category][slug][$eq]=dostoprimechatelnosti"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "dostoprimechatelnosti"
  );


  const { placesData } = useGetAllPlacesQuery(
    {
      populate: "populate=type.icon, icon",
      page: 1,
      pageSize: 9999,
      fields:
        "fields[0]=id&fields[1]=title&fields[2]=short_title&fields[3]=latitude&fields[4]=longitude&fields[5]=description&fields[6]=image_url",
      filter: categoryFilter,
    },
    {
      selectFromResult: (res) => ({
        placesData: res?.data?.data,
      }),
      skip: !categoryFilter,
    }
  );

  const { categories } = useGetAllPlaceCategoriesQuery("", {
    selectFromResult: (res) => ({
      categories: res?.data?.data,
    }),
  });

  function cleanPlacesData() {
    setCategoryFilter("");
    setSelectedCategory("");
    setIsNothing(true);
  }

  useEffect(() => {
    if (placesData) setPlacesData(placesData);
  }, [placesData]);

  useEffect(() => {
    if (selectedCategory)
      setCategoryFilter(
        `filters[$and][0][category][slug][$eq]=${selectedCategory}`
      );
  }, [selectedCategory]);

  return (
    <ul className="flex w-full select-none gap-2 lg:flex-wrap">
      {/* <li
        className={`box relative inline cursor-pointer whitespace-nowrap rounded-full !px-4 !py-1 shadow ${
          isAll ? "!bg-primary text-white" : "bg-base-100"
        }`}
        onClick={() => {
          setIsAll(true);
          setIsNothing(false);
          setCategoryFilter("");
          setSelectedCategory("");
          setPlacesData(placesData);
        }}
      >
        Все
      </li> */}

      <li
        className={`box relative inline cursor-pointer whitespace-nowrap rounded-full !px-4 !py-1 shadow ${
          isNothing ? "!bg-primary text-white" : "bg-base-100"
        }`}
        onClick={cleanPlacesData}
      >
        Только маршрут
      </li>

      {categories &&
        categories.map(
          (category: {
            id: number;
            slug: string;
            title: string;
            place_tags: { id: number; title: string }[];
          }) => (
            <li
              className={`box relative inline cursor-pointer whitespace-nowrap rounded-full !px-4 !py-1 shadow ${
                selectedCategory === category.slug
                  ? "!bg-primary text-white"
                  : "bg-base-100"
              }`}
              key={category.id}
              onClick={() => {
                setIsNothing(false);
                setSelectedCategory(category.slug);
              }}
            >
              <span className="text-nowrap">{category.title}</span>
            </li>
          )
        )}
    </ul>
  );
};
