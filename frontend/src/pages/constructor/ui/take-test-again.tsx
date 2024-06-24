import {
  changeLocalTrip,
  closeMobileSheet,
  selectIsAuthorized,
  useTripPlaces,
} from "@/entities";
import { Modal, useAppDispatch, useAppSelector } from "@/shared";

interface IProps {}
export const TakeTestAgain: React.FC<IProps> = ({}) => {
  const { removeAllPlaces } = useTripPlaces();
  const isAuth = useAppSelector(selectIsAuthorized);
  const dispatch = useAppDispatch();
  function closeSheet() {
    dispatch(closeMobileSheet());
  }

  function confirmNewTest() {
    closeSheet();
    if (isAuth) removeAllPlaces();
    else dispatch(changeLocalTrip(null));
  }

  return (
    <>
      <Modal
        content={
          <div className="flex flex-col gap-2">
            <h2 className="title">Пройти тест заново?</h2>
            <div role="alert" className="alert alert-info">
              <span>
                {isAuth
                  ? "По итогам теста будет создан новый маршрут, но вы всегда сможете продолжить нынешний!"
                  : "По итогам теста будет создан новый маршрут, но вы не сможете продолжить нынешний!"}
              </span>
            </div>
            <div>
              <form method="dialog" className="flex justify-between gap-2">
                <button className="btn" onClick={confirmNewTest}>
                  пройти тест
                </button>
                <button className="btn">отмена</button>
              </form>
            </div>
          </div>
        }
      >
        <button className="btn-sm btn w-full">пройти тест заново</button>
      </Modal>
    </>
  );
};
