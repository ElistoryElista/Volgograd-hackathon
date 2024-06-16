import { changeStartPosition, selectStartPosition } from "@/entities";
import { useAppDispatch, useAppSelector } from "@/shared";
import { CustomMarker } from "@/widgets/map/ui/custom-marker";

interface IProps {}
export const StartMarker: React.FC<IProps> = ({}) => {
  const startPoint = useAppSelector(selectStartPosition);
  const dispatch = useAppDispatch();

  return (
    <>
      {startPoint && (
        <CustomMarker
          popup={
            <>
              <h4 className="title">Стартовая позиция</h4>{" "}
              <p>
                Мы учтем вашу стартовую позицию, чтобы создать наилучший
                маршрут!
              </p>
              <button
                className="btn w-full"
                onClick={() => dispatch(changeStartPosition(null))}
              >
                Не учитывать эту точку
              </button>
            </>
          }
          position={{ lat: startPoint.lat, lng: startPoint.lon }}
          color={"#570DF8"}
          zIndex={10}
        />
      )}
    </>
  );
};
