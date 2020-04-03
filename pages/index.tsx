// @deno-types="https://deno.land/std/types/react.d.ts"
// @deno-types="https://deno.land/std/types/react-dom.d.ts"
import React from "react";

const Home = ({ examples }: { examples: Array<any> }) => {
  return (
    <>
      <div className="container">
        <header>
          <h1>Deno by Example</h1>
        </header>
        <nav>
          <div className="list-group">
            {examples.map((example) => (
              <a href={`/examples/${example.slug}`}>{example.title}</a>
            ))}
          </div>
        </nav>
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

export default Home;
