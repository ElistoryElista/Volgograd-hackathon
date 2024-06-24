import { selectMethodMovement, useTripPlaces } from "@/entities";
import { Modal, useAppSelector } from "@/shared";
import {
  VKShareButton,
  TelegramShareButton,
  TelegramIcon,
  VKIcon,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
} from "react-share";

interface IProps {
  className?: string;
  size?: "sm" | "md";
}
export const ShareButton: React.FC<IProps> = ({ size = "md" }) => {
  const { tripPlaces } = useTripPlaces();
  const movement = useAppSelector(selectMethodMovement);
  const shareUrl =
    "https://" +
    window.location.hostname +
    `/shared-route/${tripPlaces?.map((place) => place.id)}/${movement}`;

  return (
    <Modal
      content={
        <div className="flex flex-col gap-2">
          <h2 className="title">Поделится маршрутом</h2>
          <p>
            Поделитесь своим маршрутом с друзьями и знакомыми, чтобы они могли
            присоединиться к вашему маршруту.
          </p>
          <span className="divider"></span>
          <ul
            tabIndex={0}
            className="menu rounded-box z-30 w-full gap-2 bg-base-100 p-2 shadow"
          >
            <li>
              <TelegramShareButton url={shareUrl} className="!important p-2">
                <TelegramIcon size={"100%"} className="w-6" round />
                Телеграм
              </TelegramShareButton>
            </li>
            <li>
              <VKShareButton url={shareUrl} className="!important p-2">
                <VKIcon size={"100%"} className="w-6" round />
                Вконтакте
              </VKShareButton>
            </li>
            <li>
              <WhatsappShareButton url={shareUrl} className="!important p-2">
                <WhatsappIcon size={"100%"} className="w-6" round />
                Whatsapp
              </WhatsappShareButton>
            </li>
            <li>
              <ViberShareButton url={shareUrl} className="!important p-2">
                <ViberIcon size={"100%"} className="w-6" round />
                Viber
              </ViberShareButton>
            </li>
          </ul>
        </div>
      }
    >
      <button className={`btn btn-${size} w-full`}>
        поделиться
        <svg
          className={size === "sm" ? "w-4" : "w-6"}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7 0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92 0-1.61-1.31-2.92-2.92-2.92Z"></path>
        </svg>
      </button>
    </Modal>
  );
};
