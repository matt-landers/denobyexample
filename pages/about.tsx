import React from "react";

const About = ({ examples }: { examples: Array<any> }) => {
  return (
    <>
      <div className="container">
        <header>
          <h1>About Deno by Example</h1>
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

export default About;
