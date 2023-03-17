import { InfinitySpin } from "react-loader-spinner";
import "./index.css";

const EclipseWidgetContainer = () => {
  return (
    <div className="my_eclipse">
      <div className="progress">
        <div>
          <InfinitySpin width="200" color="#002F34" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};
const EclipseWidget = EclipseWidgetContainer;
export default EclipseWidget;
