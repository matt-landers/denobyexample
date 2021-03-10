import { React } from "../deps/react.ts";

const Home = ({ examples }: { examples: Array<any> }) => {
  return (
    <>
      <div className="container">
        <header>
          <h1>Deno by Example</h1>
        </header>
        <nav>
          <div className="list-group">
            {examples &&
              examples.map((example) => (
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
