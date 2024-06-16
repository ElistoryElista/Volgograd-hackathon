import { MapLayers } from "@/widgets";
import { UserMarker } from "./user-marker";
import { MapClickPopup } from "./map-click-popup";
import { IncidentMarkers } from "./incident-markers";
import { Sidebar } from "./sidebar";
import { StartMarker } from "./start-marker";
import { TripOnMap } from "./trip-on-map";
import { CreateTripModal } from "./create-trip-modal";
import { useWindowDimensions } from "@/shared";
import { MobileSheet } from "./mobile-sheet";
import { MobileSheetController } from "./mobile-sheet-controller";
import { FilteredPlaces } from "./filtered-places";
import { useState } from "react";
import { TPlace } from "@/shared/model/types";
import { FilterByCategory } from "./filter-by-category";

export const Page: React.FC = () => {
  const { width: windowWith } = useWindowDimensions();
  const isDesktop = windowWith >= 1024;
  const [places, setPlaces] = useState<TPlace[]>([]);
  const [isNothing, setIsNothing] = useState<boolean>(true);

  return (
    <div className="fixed left-0 top-0  h-full w-full">
      <CreateTripModal />
      {isDesktop ? <Sidebar /> : <MobileSheet />}
      <div className="hide-scrollbar absolute top-[calc(80px+0.5rem)] z-30 max-w-[100%] overflow-x-auto px-4 lg:top-[calc(80px+1rem)] lg:ml-[calc(320px+1rem)] lg:overflow-visible">
        <FilterByCategory
          isNothing={isNothing}
          setIsNothing={setIsNothing}
          setPlacesData={(places) => setPlaces(places)}
        />
      </div>
      <MapLayers>
        <MapClickPopup />
        <IncidentMarkers />
        <StartMarker />
        {!isNothing && <FilteredPlaces places={places} />}
        <TripOnMap />
        <MobileSheetController />
        <UserMarker />
      </MapLayers>
    </div>
  );
};
