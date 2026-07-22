import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <ClipLoader color="#2563eb" size={60} />
    </div>
  );
}
