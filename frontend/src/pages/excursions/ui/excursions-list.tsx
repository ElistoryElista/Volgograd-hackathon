import { useGetAllExcursionsQuery } from "@/entities";
import { CopyButton, Modal } from "@/shared";
import { TExcursion } from "@/shared/model/types";

interface IProps {}
export const ExcursionsList: React.FC<IProps> = ({}) => {
  const { excursions } = useGetAllExcursionsQuery(
    { populate: "populate=preview_image" },
    {
      selectFromResult(res) {
        return { excursions: res?.data?.data };
      },
    }
  );

  return (
    <div className="flex flex-col gap-4">
      {excursions?.map((excursion: TExcursion) => {
        const image =
          excursion.preview_image.formats?.small?.url ||
          excursion.preview_image.formats?.thumbnail?.url ||
          excursion.preview_image.url;

        return (
          <div key={excursion.id} className="flex gap-2">
            <div className="aspect-square w-[40%] lg:w-[20%]">
              <img
                src={image}
                alt="image"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>

            <div className="flex flex-grow basis-10 flex-col gap-1">
              <h3 className="title !text-sm">{excursion.title}</h3>
              <p className="flex-grow basis-5 text-ellipsis text-sm">
                {excursion.subtitle}
              </p>
              <Modal
                content={
                  <div className="flex flex-col gap-2">
                    <h2 className="title">{excursion.title}</h2>
                    <p>{excursion.subtitle}</p>
                    <pre>{excursion.description}</pre>
                  </div>
                }
              >
                <button className="btn-sm btn w-full">подробнее</button>
              </Modal>
              <Modal
                content={
                  <div className="flex flex-col gap-4">
                    {excursion.organizational_phone && (
                      <div className="flex items-center gap-2">
                        <span className="">
                          Телефон:{" "}
                          <span className="title !text-sm">
                            {excursion.organizational_phone}
                          </span>
                        </span>
                        <CopyButton
                          textToCopy={excursion.organizational_phone}
                        />
                      </div>
                    )}
                    {excursion.email && (
                      <div className="flex items-center gap-2">
                        <a
                          className="btn w-full"
                          href={"mailto:" + excursion.email}
                        >
                          написать на почту
                        </a>
                      </div>
                    )}
                  </div>
                }
              >
                <button className="btn-primary btn-sm btn w-full">
                  записаться
                </button>
              </Modal>
            </div>
          </div>
        );
      })}
    </div>
  );
};
