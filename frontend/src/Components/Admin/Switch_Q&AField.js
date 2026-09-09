export const handleButtonClick = (id, setActiveButton) => {
    //Set a button active at a time..
    setActiveButton((prevState) => ({
      ...Object.fromEntries(Object.keys(prevState).map(key => [key, key === id ? true : false]))
    }));
  };