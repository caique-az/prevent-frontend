# 🌪️ Prevent - Natural Disaster Monitoring System

![Prevent Logo](public/tornado-solid.svg)

Prevent is a React-based web application designed to assist in monitoring and preventing natural disasters by providing real-time information about risk areas, weather conditions, and event history.

## 🚀 Features

- 🗺️ Interactive map with risk areas and evacuation routes
- 📊 Precipitation and weather condition charts
- 🔍 Real-time natural disaster monitoring
- 📱 Responsive and intuitive interface
- 📈 Event history and alerts
- 🛡️ Safety tips for before, during, and after emergencies
- 🚦 Safe routes and meeting points for evacuation
- 📬 Contact form for feedback and support

## 🛠️ Tech Stack

- **Frontend**:
  - React 19
  - React Router DOM
  - Styled Components
  - Bootstrap 5
  - Font Awesome
  - Leaflet (interactive maps)
  - Recharts (data visualization)

- **Development Tools**:
  - Vite
  - ESLint + Prettier
  - Git + Husky

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone [REPOSITORY_URL]
   cd prevent-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/      # Reusable components
│   ├── ErrorBoundary/
│   ├── Footer/
│   ├── Header/
│   ├── Loading/
│   └── Map/
├── pages/           # Application pages
│   ├── Configurations/
│   ├── Contact/
│   ├── DicasSeguranca/
│   ├── Historico/
│   ├── Home/
│   ├── NoResults/
│   ├── NotFound/
│   ├── Project/
│   ├── Results/
│   └── RotasSeguras/
├── Routes/
│   └── routes.jsx   # Routing configuration
├── App.jsx          # Root component
└── main.jsx         # Entry point
```

## 🌐 Available Routes

- `/` - Home page
- `/results/:city` - Monitoring and results for a given city/state
- `/projects` - Related projects
- `/configurations` - System settings
- `/historico/:estado` - Event history for a given state
- `/rotas-seguras` - Safe evacuation routes and meeting points
- `/dicas-seguranca` - Safety tips for emergencies
- `/contact` - Contact form
- `/no-results` - No results found page
- `*` - 404 Not Found

## 🛠️ Development

- Lint code:
  ```bash
  npm run lint
  ```

- Format code:
  ```bash
  npm run format
  ```

- Build for production:
  ```bash
  npm run build
  ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For more information, please contact: [caiqueazevedo2005@gmail.com](mailto:caiqueazevedo2005@gmail.com)

---

Built with ❤️ by Caique Azevedo
