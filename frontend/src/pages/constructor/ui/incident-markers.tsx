import { selectLocalIncidentPoints } from "@/entities";
import { useGetIncidentsQuery } from "@/entities/incident";
import { useAppSelector } from "@/shared";
import { isDateGreaterThanNow } from "@/shared/lib";
import { TValhallaPoint } from "@/shared/model/types";
import { CustomMarker } from "@/widgets/map/ui/custom-marker";

interface IProps {}
export const IncidentMarkers: React.FC<IProps> = ({}) => {
  const localIncidentPoints = useAppSelector(selectLocalIncidentPoints);
  const { incidents } = useGetIncidentsQuery("", {
    selectFromResult: (res) => {
      return {
        incidents: res?.data?.data?.filter((incident: IIncident) => {
          if (incident.when_delete === null) return true;
          else return isDateGreaterThanNow(incident.when_delete);
        }),
      };
    },
  });

  interface IIncident {
    id: number;
    type: string;
    descriptions: string;
    latitude: number;
    longitude: number;
    when_delete: string;
  }

  return (
    <>
      {incidents?.map((incident: IIncident) => (
        <CustomMarker
          key={incident.id}
          position={{ lat: incident.latitude, lng: incident.longitude }}
          iconUrl="https://e7.pngegg.com/pngimages/905/812/png-clipart-handyman-home-repair-computer-icons-tool-icon-design-house-angle-service.png"
          color="orange"
          popup={
            <>
              <h3 className="font-bold">{incident.type}</h3>
              <p>{incident.descriptions}</p>
            </>
          }
        />
      ))}
      {localIncidentPoints?.map((incident: TValhallaPoint, index: number) => (
        <CustomMarker
          key={index}
          position={{ lat: incident.lat, lng: incident.lon }}
          iconUrl="https://e7.pngegg.com/pngimages/905/812/png-clipart-handyman-home-repair-computer-icons-tool-icon-design-house-angle-service.png"
          color="orange"
          popup={<></>}
        />
      ))}
    </>
  );
};
