import { openMobileSheet } from "@/entities";
import { useAppDispatch, useWindowDimensions } from "@/shared";
import Control from "react-leaflet-custom-control";

interface IProps {}
export const MobileSheetController: React.FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  function openSheet() {
    dispatch(openMobileSheet());
  }
  const { width: windowWith } = useWindowDimensions();
  const isDesktop = windowWith >= 1024;
  return (
    <>
      <Control position="bottomright">
        {!isDesktop && (
          <button
            onClick={openSheet}
            className="btn-primary  btn mb-[64px] lg:hidden"
          >
            показать маршрут
          </button>
        )}
      </Control>
    </>
  );
};
