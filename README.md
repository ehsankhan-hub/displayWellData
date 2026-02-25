# Simple Canvas Demo

A basic Angular application demonstrating simple canvas tracks using GeoToolkit.

## 🎯 Features

- **Simple Canvas Tracks** - Basic well log visualization
- **Three Sample Tracks** - Gamma Ray, Resistivity, and Neutron Porosity
- **Clean UI** - Modern, responsive design
- **GeoToolkit Integration** - Uses @int/geotoolkit libraries

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Open browser:**
   Navigate to `http://localhost:4200`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linting
- `npm run json-server` - Start mock API server
- `npm run generate-data` - Generate sample well data
- `npm run dev` - Start all services concurrently

## 📊 Canvas Tracks

The demo includes three simple tracks:

1. **Gamma Ray (GR)** - Red curve (#FF6B6B)
2. **Resistivity (RT)** - Teal curve (#4ECDC4)  
3. **Neutron Porosity (NPHI)** - Blue curve (#45B7D1)

## 🎨 Features

- **Responsive Design** - Adapts to different screen sizes
- **Interactive Canvas** - Well log visualization with zoom/pan
- **Track Information** - Color-coded legend
- **Sample Data** - 1000 data points per track

## 📁 Project Structure

```
src/
├── app/
│   ├── demos/
│   │   └── simplecanvas/
│   │       ├── simple-canvas.component.ts
│   │       ├── simple-canvas.component.html
│   │       └── simple-canvas.component.css
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.module.ts
│   └── app-routing.module.ts
├── main.ts
├── polyfills.ts
└── styles.css
```

## 🔧 Technology Stack

- **Angular 19** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **GeoToolkit** - Well log visualization library
- **CSS3** - Modern styling

## 📝 Development Notes

- Uses GeoToolkit WellLogWidget for canvas rendering
- Sample data generated randomly for demonstration
- Component follows Angular best practices
- Responsive design with modern CSS

## 🌐 Access

- **Main URL:** `http://localhost:4200`
- **Canvas Demo:** `http://localhost:4200/simple-canvas`

---

**Simple Canvas Demo** - Basic well log visualization with GeoToolkit
