import { AppContext } from "./state/AppContext";
import { CharactersSelect } from "./pages";
import "./App.css";

const App = () => (
  <AppContext>
    <CharactersSelect />
  </AppContext>
);

export default App;
