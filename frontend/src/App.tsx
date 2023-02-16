import './styles/global.css';
import "./services/dayjs";
import Header from './components/Header';
import Days from './components/Days';
import { useContext } from "react";
import HabitGraph from './components/HabitGraph';
import { graphOrListContext } from "./contexts/GraphOrList";

function App() {
  const { state } = useContext(graphOrListContext);
  
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-10 ">
        <Header />
        {state ? <HabitGraph /> : <Days />}
      </div>
    </div>

  )
}

export default App;
