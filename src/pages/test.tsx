import { React } from "../deps/react.ts";

const Test = ({ examples }: { examples: Array<any> }) => {
  return (
    <>
      <div className="container">
        <header>
          <h1>Test</h1>
        </header>
      </div>
      <footer className="container">
        <div className="row">
          <div className="col-12">
            <a href="https://github.com/matt-landers/denobyexample">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Test;
