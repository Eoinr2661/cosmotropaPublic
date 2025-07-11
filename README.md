# Welcome to my Rocket Tracking Application #

### 🧭 Simplifying Rocket Recovery and Tracking

Rocket enthusiasts often face challenges when recovering their rockets after launch, as existing
solutions tend to be complex, inaccessible, costly, and lack integrated mapping features. 
Cosmotropa Rocket Tracker addresses these issues with a free, open-source Android app and a companion website.

The app, developed using React Native, and the website, built with React.js, enable users to track and
analyse their rockets in real-time and retrospectively. By connecting an Eggtimer transmitter and ground
station to the app, users can visualise data and track their rocket’s location live on a map. 

Additionally, the rocket's flight path and data are displayed in graphs on the website. This solution integrates web,
backend, and mobile components to provide a user-friendly and effective tool for rocket tracking and
data visualisation.

### 🚀 Soviet Theme

I chose a Soviet theme for this app to commemorate the 50th anniversary of the Soyuz-16 flight (Dec 2, 1974).
It marked the first example of scientific collaboration in space between the USA and USSR. 

The bold reds and yellows with the retro-futurism of Soviet propaganda art make for a distinctive look and feel. 

I had also planned on implementing a NASA theme, allowing users to switch between between them, but time constraints didn't allow for this.

### 📺 Demo Video

Watch the demo video at this link: https://youtu.be/AfWOQX_Dv3s

### 🛰️ The Application 

This application can connect to the Eggfinder Mini transmitter and translate NMEA sentences into meaningful data, and map location
Use this app to track down your rockets after launch, record the flight data to a database, and review your rocket's performance. 
This app was primarily developed and tested using the Eggfinder Mini, however it should still work for any bluetooth receiver that transmits standard NMEA sentences. 

### 👾 Functionality

This application can:

- Connect to a bluetooth card in a compatible groundstation, and translate those NMEA sentences it receives
- Show both user location and rocket location on a map
- Output stats including connection strength, altitude, coordinates, and speed
- Save flight data to a database, which can then be viewed on the companion website to display flightpath, and visualise the data in graphs

### 📚 Getting Started / How to use

- 📲 To begin, pair your mobile device to the groundstation using your native Bluetooth.
- 📡 Go into the app and connect using the Bluetooth/devices tab.
- 📶 Ensure you have a good connection strength (tracked satellites) – this can be done via the raw stream in the Bluetooth tab, or the stats tab under "connection strength."
- ⚙️ Configure your flight recording from the "home" tab if you wish to record to the database.
- 🗺️ Observe your rocket's flight using the map screen.
- 🚀 Find your rocket, and be sure to stop the recording from the home tab if you had that running!

### 📝 License

This project is proprietary and all rights are reserved. 
You may not use, copy, modify, or distribute this software without explicit permission from the author. 
For licensing inquiries, please refer to the contact information below. 

### 📫 Contact

Email - eoin.v.rochford@gmail.com
Github - https://github.com/Eoinr2661
LinkedIn - https://www.linkedin.com/in/eoin-rochford/
