import {
  changeUserPosition,
  selectIsAuthorized,
  selectLocalTrip,
  useGetTripPlacesQuery,
} from "@/entities";
import { TestAdditionalNeeds } from "@/features/test-additional-needs";

import { ArrowRightIcon, useAppDispatch, useAppSelector } from "@/shared";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LoginStep } from "./login-step";
import { RoutesList } from "./routes-list";
import { UserPositionStep } from "./user-position-step";

interface IProps {}
export const CreateTripModal: React.FC<IProps> = ({}) => {
  const isAuth = useAppSelector(selectIsAuthorized);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const dispatch = useAppDispatch();
  const localTrip = useAppSelector(selectLocalTrip);
  const { tripPlaces } = useGetTripPlacesQuery("", {
    selectFromResult(res) {
      return {
        tripPlaces: res?.data?.trip_places,
      };
    },
    skip: !isAuth,
  });

  const [step, setStep] = useState<number>(0);
  function showModal() {
    if (modalRef.current) {
      modalRef.current.showModal();
      dispatch(changeUserPosition(null));
    }
  }

  function closeModal() {
    if (modalRef.current) {
      modalRef.current.close();
    }
  }

  function finishTest() {
    setStep(0);
    closeModal();
  }

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  const authSteps = [
    <TestAdditionalNeeds finishCallback={nextStep} />,
    <UserPositionStep callback={nextStep} />,
    <RoutesList finishCallback={finishTest} />,
  ];

  const unAuthSteps = [
    <LoginStep nextUnAuthCallback={nextStep} />,
    <TestAdditionalNeeds finishCallback={nextStep} />,
    <UserPositionStep callback={nextStep} />,
    <RoutesList finishCallback={finishTest} />,
  ];

  useEffect(() => {
    if (isAuth && tripPlaces?.length === 0) showModal();
    if (!isAuth && !localTrip) showModal();
  }, [tripPlaces, localTrip]);

  return (
    <>
      <dialog
        onCancel={(event) => event.preventDefault()}
        ref={modalRef}
        className="modal"
      >
        <div className={`modal-box lg:max-w-4xl`}>
          <Link to="/home" className="link mb-2 flex items-center">
            <ArrowRightIcon className="w-6 rotate-180" />
            Вернуться на Главную
          </Link>
          {/* <span className="divider"></span> */}
          {isAuth ? authSteps[step] : unAuthSteps[step]}
        </div>
      </dialog>
    </>
  );
};
