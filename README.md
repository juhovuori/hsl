* HSL

Visualisations and data analysis of HSL vehicle location data and schedules

Directory structure
- /app contains a express.js application that hosts the visualisations.
- /tools contains primarily a python tool to query HSL APIs
- You need to have /credentials.conf file that contains the following lines:
  1. your HSL username
  2. your HSL password
  3. A Postgres URL for your data
  4. Your mapbox access token
