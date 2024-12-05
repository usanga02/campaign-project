import { useAuth } from "../context/AuthProvider";

const Notify = () => {
  const { message } = useAuth();
  return (
    <>
      {message != null && (
        <div
          className={`${
            message.variant == "error"
              ? `border border-red-300 bg-red-200 text-red-700`
              : `border border-green-300 bg-green-200 text-green-700`
          } ${
            message ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } transition-transform duration-1000 ease-in-out flex items-center justify-between md:justify-start gap-8 fixed top-4 right-5 md:right-10 z-50 px-4 py-3 rounded-md w-full md:w-fit md:max-w-[508px] `}
        >
          <span className={` flex items-center gap-4`}>{message.message}</span>
        </div>
      )}
    </>
  );
};

export default Notify;
