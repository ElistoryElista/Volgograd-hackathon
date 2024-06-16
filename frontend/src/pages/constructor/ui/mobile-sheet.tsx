import { Sheet } from "react-modal-sheet";
import { ArrowDownIcon, useAppDispatch, useAppSelector } from "@/shared";
import { closeMobileSheet, selectIsMobileSheet } from "@/entities";
import { TripList } from "./trip-list";
import { FeedbackModal } from "@/features";
import { TakeTestAgain } from "./take-test-again";
import { RouteMode } from "./route-mode";

export function MobileSheet() {
  const isOpen = useAppSelector(selectIsMobileSheet);
  const dispatch = useAppDispatch();
  function closeSheet() {
    dispatch(closeMobileSheet());
  }

  return (
    <div className="fixed">
      <Sheet isOpen={isOpen} onClose={closeSheet}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="box flex h-full w-full flex-col ">
              <div className="flex-grow overflow-y-auto">
                <TripList />
              </div>
              <RouteMode />
              <div className="flex flex-col gap-2">
                <FeedbackModal
                  title="Оцените построенный маршрут"
                  info="Мы хотим сделать наш сервис еще лучше. Здесь вы можете оценить построенный маршрут, а так же предложить свои улучшения."
                >
                  <button className="btn-sm btn w-full">Оцените маршрут</button>
                </FeedbackModal>
                <TakeTestAgain />
                <button
                  onClick={closeSheet}
                  className="btn-primary btn-sm btn "
                >
                  Показать карту <ArrowDownIcon className="w-6" />
                </button>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}
