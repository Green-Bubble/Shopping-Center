import Spinner from "@view/components/Spinner";

const Loading = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Spinner />
  </div>
);

export default Loading;
