interface IProps {
  isEdit: boolean;
  toggleEdit: () => void;
}
export const EditButton: React.FC<IProps> = ({ isEdit, toggleEdit }) => {
  return (
    <button onClick={toggleEdit} className={`btn btn-sm`}>
      {isEdit ? (
        <svg
          className="w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m14.77 8.31.92.92-1.11 1.11 1.41 1.41 2.52-2.52-3.75-3.75L12.24 8l1.41 1.41 1.12-1.1Zm6.65-1.98a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29-.26 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83ZM3.52 2.1 2.1 3.51l7.32 7.32-5.71 5.71v3.75h3.75l5.71-5.71 7.32 7.32 1.41-1.41L3.52 2.1Zm3.11 16.19h-.92v-.92l5.13-5.13.92.92-5.13 5.13Z"></path>
        </svg>
      ) : (
        <svg
          className="w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m14.059 9.02.92.92L5.919 19h-.92v-.92l9.06-9.06Zm3.6-6.02c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29Zm-3.6 3.19L2.999 17.25V21h3.75l11.06-11.06-3.75-3.75Z"></path>
        </svg>
      )}
    </button>
  );
};
