import { Circles } from "react-loader-spinner";

const Loader = () => (
  <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="loading"
      visible={true}
    />
  </div>
);

export default Loader;
