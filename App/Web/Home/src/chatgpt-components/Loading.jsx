// https://loading.io/css/
import "./Loading.css";
export default function Loading() {
  return (
    <div className="text-center">
      <div className="lds-facebook text-green-500">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
