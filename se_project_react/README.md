## Project WTWR: What to Wear?

Welcome to my project. I built WTWR because I wanted to solve that classic daily dilemma: "What should I wear today?" Instead of just checking the numbers on a weather app, this project suggests clothes from a virtual closet based on the real-time temperature in your area.

How it works
The app connects to the OpenWeather API to fetch live data for your city. It’s not just about the temperature; it’s smart enough to calculate the sun cycle (sunrise and sunset) to switch the UI between day and night modes automatically.

If it's 75°F and sunny, you'll see your summer gear. If a cold front hits, the app instantly updates to show your jackets and boots.

## Technologies and techniques used

- React 18 (Hooks & Functional Components): The core of the app. I used useEffect to synchronize the app with live weather data and useState to manage complex UI states, like switching between different modals.

- Vite: Its lightning-fast HMR (Hot Module Replacement) and optimized build process.

- JavaScript (ES6+): I wrote a custom filtering system that takes raw data from the API and maps it to specific clothing categories (Hot/Warm/Cold).

- CSS3 & BEM Methodology: Styles are organized using BEM to keep the code maintainable. I spent a lot of time on the Item Modal, ensuring images are full-bleed without breaking the footer layout.

- Asynchronous API Handling: Used the Fetch API with modern async/await and Promises to handle data flow and error management gracefully.

- Semantic HTML5: Ensuring the app is accessible and structured correctly for screen readers and SEO.

## Project Pitch Video

- Check out [this video](https://drive.google.com/file/d/1xZlK-gslIMrTOyU5TvzMEDXnjiQ369U4/view?usp=sharing),
  where I describe my project and some challenges I faced while building it.

## Link to project on GitHub Pages

- [Link to the project](https://github.com/GabrielaB3/se_project_react.git)

## Link to the Website

- [URL] (https://Gabrielab3.github.io/se_project_react)
