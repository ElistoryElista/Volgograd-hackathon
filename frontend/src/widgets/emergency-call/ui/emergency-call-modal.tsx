import { Modal, PhoneIcon } from "@/shared";

interface IProps {
  children: React.ReactNode;
}
export const EmergencyCallModal: React.FC<IProps> = ({ children }) => {
  return (
    <Modal
      content={
        <div className="mt-4 flex flex-col gap-2">
          <h3 className="title">Службы экстренного вызова</h3>
          <div className="flex items-center justify-between gap-2">
            Служба "Экстренный вызов" (112)
            <div className="flex gap-2">
              <a href="tel:112" className="btn">
                <PhoneIcon className="w-4" />
              </a>
              <a href="sms:112" className="btn">
                SMS
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between  gap-2">
            МУ "Служба спасения Волгограда" (089)
            <div className="flex gap-2">
              <a href="tel:089" className="btn">
                <PhoneIcon className="w-4" />
              </a>
              <a href="sms:089" className="btn">
                SMS
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            Скорая помощь (103)
            <div className="flex gap-2">
              <a href="tel:103" className="btn">
                <PhoneIcon className="w-4" />
              </a>
              <a href="sms:103" className="btn">
                SMS
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            Единая дежурно-диспетчерская служба Волгограда (95-95-81)
            <div className="flex gap-2">
              <a href="tel:95-95-81" className="btn">
                <PhoneIcon className="w-4" />
              </a>
              <a href="sms:95-95-81" className="btn">
                SMS
              </a>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </Modal>
  );
};
