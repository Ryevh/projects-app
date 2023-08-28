// SETUP REFERENCE TO THE BUILT-IN OBJECT FROM INSTALLED PACKAGE TO ACCESS/USE IT HERE
import { useState, useEffect } from "react";
// NOTE: useState(state, function) - is to setup local initial/default state data values
// NOTE: useEffect to setup local side effect to do smth only once if depencency array is empty or do smth everytime when dependency array has some state values to depend from

// SETUP REFERENCE TO THE BUILT-IN OBJECT FROM INSTALLED PACKAGE TO ACCESS/USE IT HERE
import { createClient } from "contentful";

// CREATE CLIENT OBJECT/INSTANCE DATA
// DEFINE VARIABLE TO STORE OBJECT DATA VALUE WITH ITS KEY/VALUE PAIR PROPERTIES
// TARGET IMPORTED BUILT-IN OBJECT 'createClient' TO INVOKE IT WITH () AND ARGUMENT OF OBJECT DATA WITH ITS KEY/VALUE PAIR PROPERTIES
const client = createClient({
  // DEFINE KEY WITH VALUE OF SPACE ID RECIEVED AFTER CREATING CONTENT DATA ON SERVER SIDE OF CONTENTFUL
  space: "lm0ev5zzmnfo",
  environment: "master",
  // DEFINE KEY WITH VALUE OF SPACE ID RECIEVED AFTER CREATING CONTENT DATA ON SERVER SIDE OF CONTENTFUL
  accessToken: import.meta.env.VITE_API_KEY,
});

// CREATE CUSTOM REUSABLE APPLICATION OBJECT HOOK TO DO/HANDLE SMTH
// DEFINE & EXPORT VARIABLE WITH ARROW FUNCTION DATA VALUE
export const useFetchProjects = () => {
  // CREATE LOCAL STATE DATA VALUES
  // DEFINE VARIABLES THROUGH DESTRUCTURING ARRAY 'const []' SYNTAX TO STORE STATE DATA FROM INVOKED IMPORTED OBJECT HOOK WITH ARGUMENT OF INITIAL/DEFAUL DATA VALUE
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  // DEFINE LOCAL ASYNCHRONOUS FUNCTION EXPRESSION TO DO/HANDLE SMTH WHEN ITS INVOKED/CALLED
  const getData = async () => {
    // USE BUILT-IN TRY & CATCH BLOCK SYNTAX TO RETURN A CERTAIN RESULT
    try {
      // EXECUTE BLOCK CODE OF JS STATEMENTS IF THERE IS SUCCESS

      // SETUP ACCESS TO GET ENTRIES DATA OF CLIENT OBJECT CONTENT DATA FROM THE BACKEND
      // DEFINE VARIABLE TO STORE DATA OF TARGETED LOCAL VARIABLE 'client' OF CLIENT CONTENT OBJECT TO ACCESS '.' TO THE BUILT-IN JS METHOD  getEntries() WITH ARGUMENT OF OBJECT KEY/VALUE PAIR PROPERTY VALUE OF CONTENT MODEL CREATED AT CONTENTFUL SERVER SIDE 'projects'
      const response = await client.getEntries({ content_type: "projects" });

      // ITERATE THROUGH EACH RECIEVED PROJECT DATA STORED IN 'const response' TO RETURN A NEW PARSED DATA VALUE
      const projects = response.items.map((item) => {
        // EXECUTE BLOCK CODE OF JS STATEMENTS AT EACH ITERATION

        // DEFINE VARIABLES THROUGH DESTRUCTURING OBJECT 'const {}' SYNTAX TO STORE DATA FROM EACH RECIEVED ITERATED ITEM
        const { title, url, image } = item.fields;
        // DEFINE VARIABLE TO STORE PULLED OUT/RECIEVED THE ID VALUE FROM EACH ITERATED ITEM
        const id = item.sys.id;
        // DEFINE VARIABLE TO STORE PULLED OUT/RECIEVED THE IMAGE VALUE FROM EACH ITERATED ITEM
        const img = image?.fields?.file?.url;

        // NOTE: we use built-in optional chaining operator '?' to check if item exists to do next thing otherwise stop and do nothing

        // NOTE: in result this syntax code -> image?.fields?.file?.url; means if image exist 'image?' then access to fileds property and if 'fields?' exists then access to file propert and if exists 'file?' then access to url value

        // RETURN OBJECT DATA
        return { title, url, id, img };
      });

      // TARGET STATE VARIABLE WITH FUNCTION DATA TO INVOKE IT WITH () PARANTHESIS OPERATOR TO UPDATE STATE INITIAL DATA TO A NEW DATA VALUE
      setProjects(projects);

      // TARGET STATE VARIABLE WITH FUNCTION DATA TO INVOKE IT WITH () PARANTHESIS OPERATOR TO UPDATE STATE INITIAL DATA TO A NEW DATA VALUE
      setLoading(false);

      // OTHERWISE CATCH FOR ERROR IF THERE IS ONE AND
    } catch (error) {
      // EXECUTE BLOCK CODE OF JS STATEMENTS IF THERE IS AN ERROR

      console.log(error);
      // TARGET STATE VARIABLE WITH FUNCTION DATA TO INVOKE IT WITH () PARANTHESIS OPERATOR TO UPDATE STATE INITIAL DATA TO A NEW DATA VALUE
      setLoading(false);
    }
  };

  // DEFINE LOCAL FUNCTION SIDE EFFECT TO DO/HANDLE SMTH ONLY WHEN COMPONENT IS LOADED/MOUNTED
  useEffect(() => {
    // TARGET LOCAL VARIABLE WITH FUNCTION EXPRESSION TO INVOKE/CALL/RUN IT WITH () PARANTHESIS OPERATOR
    getData();
  }, []);

  // RETURN OBJECT OF STATE DATA TO ACCESS/USE IT FROM OUTSIDE OF THIS FUNCTION OF THE CUSTOM OBJECT HOOK
  return { loading, projects };
};
