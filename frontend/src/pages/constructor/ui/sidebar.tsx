import { useAppSelector } from "@/shared";
import { TripList } from "./trip-list";
import { selectVisuallyImpairedMode, useTripPlaces } from "@/entities";
import { FeedbackModal } from "@/features";
import { TakeTestAgain } from "./take-test-again";
import { RouteMode } from "./route-mode";

interface IProps {}
export const Sidebar: React.FC<IProps> = ({}) => {
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const { tripPlaces } = useTripPlaces();

  if (tripPlaces && tripPlaces?.length !== 0)
    return (
      <div
        className="fixed left-2 z-20  h-full w-[20rem] pb-[1rem]"
        style={{
          paddingTop: isVisuallyImpaired
            ? "calc(144px + 1rem)"
            : "calc(80px + 1rem)",
        }}
      >
        <div className="box flex h-full w-full flex-col">
          <div className="flex-grow overflow-y-auto">
            <TripList />
          </div>
          <RouteMode />
          <TakeTestAgain />
          <FeedbackModal
            title="Оцените построенный маршрут"
            info="Мы хотим сделать наш сервис еще лучше. Здесь вы можете оценить построенный маршрут, а так же предложить свои улучшения."
          >
            <button className="btn-primary btn mt-2 w-full">
              Оцените маршрут
            </button>
          </FeedbackModal>
        </div>
      </div>
    );
};
