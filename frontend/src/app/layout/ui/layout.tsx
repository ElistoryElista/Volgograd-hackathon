import { selectVisuallyImpairedMode } from "@/entities";
import { VisuallyEnhancedSettingsMenu } from "@/features";
import {
  Background,
  VideoBackground,
  WarningIcon,
  useAppSelector,
  useWindowDimensions,
} from "@/shared";
import {
  EmergencyCallModal,
  Footer,
  Header,
  MobileNavigation,
} from "@/widgets";
import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout: FC = () => {
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const width = useWindowDimensions();
  const isMobile = width.width < 1024;
  const location = useLocation();
  const route = location.pathname.substring(1);

  return (
    <div
      className={`relative h-[100svh] ${
        isVisuallyImpaired ? "gray-filter" : ""
      }`}
    >
      <VideoBackground
        videoSrc="./video/background.mp4"
        disabled={isVisuallyImpaired || isMobile}
      />
      {isMobile && !isVisuallyImpaired && (
        <Background imageSrc="./images/background.jpg" />
      )}
      <div className="fixed z-30 w-full">
        <VisuallyEnhancedSettingsMenu />
        <Header />
      </div>
      <main className="relative flex h-auto min-h-full w-full pb-[calc(64px)] pt-[64px] lg:min-h-[calc(100%-116px)] lg:pb-0 lg:pt-[80px]">
        <div className="box-content w-full flex-grow overflow-auto py-2">
          <Outlet />
        </div>
        {isMobile && (
          <div className="fixed bottom-[calc(64px+4rem)] right-[10px] z-30 ">
            <EmergencyCallModal>
              <button className="btn-error btn-circle btn">
                <WarningIcon className="w-7" />
              </button>
            </EmergencyCallModal>
          </div>
        )}
      </main>
      {route !== "trip" && <Footer />}
      <MobileNavigation />
    </div>
  );
};

export default Layout;
