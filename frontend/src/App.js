import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/SpotsAll";
import SpotDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/SpotCreate";
import EditSpotForm from "./components/SpotEdit";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/api/spots">
            <AllSpots />
          </Route>
          <Route path='/api/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route path='/spots'>
            <CreateSpotForm />
          </Route>
          <Route path='/spots/:spotId'>
            <EditSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
