import { Spinner } from "../ui/spinner";

export default function ApiLoader({ message = "Loading..." }) {
  return (
    <div className="flex-1 flex items-center justify-center h-[250px] w-full">
      <div className="flex flex-col items-center justify-center gap-2 h-full w-full">
        <Spinner className="my-2 h-10 w-10" />
        <p>{message}</p>
      </div>
    </div>
  );
}
