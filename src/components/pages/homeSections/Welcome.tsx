import scss from "./Welcome.module.scss";

const Welcome = () => {
  return (
    <div className={scss.Welcome}>
      <div className="container">
        <div className={scss.content}></div>
      </div>
    </div>
  );
};

export default Welcome;
