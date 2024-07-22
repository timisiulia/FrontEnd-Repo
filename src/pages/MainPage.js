export const MainPage = () => {
  require("./../components/main-page/mainpage.scss");

  return (
    <div
      className="mainpage-container"
    >
      <div className="top-wrapper">
        <div className="title">PrimeTime</div>
        <div className="caption">
          <b>Planurile bune sunt fundamentul deciziilor bune.</b><br/>De aceea, o planificare bine facută ajută ca şi cele
          mai îndrăzneţe visuri să devină realitate.
        </div>
      </div>
    </div>
  );
};
