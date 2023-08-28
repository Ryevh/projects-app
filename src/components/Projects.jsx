// SETUP REFERENCE TO THE CUSTOM HOOK TO ACCESS/USE IT HERE
import { useFetchProjects } from "../hooks/useFetchContentfulData";

function Projects() {
  // DEFINE VARIABLES TO STORE DATA FROM IMPORTED CUSTOM OBJECT HOOK TO ACCESS/USE IT HERE
  const { loading, projects } = useFetchProjects();

  // TO TEST IN CONSOLE
  // console.log(loading, projects);

  // SETUP CONDITIONAL STATEMENT TO DISPLAY LOADING CONTENT IF CONDITION IS TRUE
  if (loading) {
    // EXECUTE BLOCK CODE OF JS STATEMENTS IF CONDITION IS TRUE

    // RETURN JSX HTML TEMPLATE OF A CONTENT DATA
    return (
      <section className="projects">
        <h2>Loading...</h2>
      </section>
    );
  }

  // RETURN JSX HTML TEMPLATE OF A CONTENT DATA
  return (
    <section className="projects">
      <div className="title">
        <h2>projects</h2>
        <div className="title-underline"></div>
      </div>
      <div className="projects-center">
        {/* SETUP DYNAMIC CONTENT LIST DATA */}
        {projects.map((project) => {
          // DEFINE VARIABLES THROUGH DESTRUCTURING OBJECT 'const {}' SYNTAX TO STORE DATA FROM EACH ITERATED ITEM
          const { id, img, url, title } = project;

          // RETURN JSX HTML TEMPLATE OF A CONTENT DATA
          return (
            <a
              href={url}
              className="project"
              key={id}
              target="_blank"
              rel="noreferrer"
            >
              <img src={img} alt={title} className="img" />
              <h5>{title}</h5>
            </a>
          );
        })}
        {/* NOTE: use built-in predefined html attribute rel="noreferrer" to avoid warning/error issues */}
      </div>
    </section>
  );
}

export default Projects;
