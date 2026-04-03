import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { mes: 'Jan', chuva: 180 },
    { mes: 'Fev', chuva: 134 },
    { mes: 'Mar', chuva: 171 },
    { mes: 'Abr', chuva: 96 },
    { mes: 'Mai', chuva: 52 },
    { mes: 'Jun', chuva: 23 },
    { mes: 'Jul', chuva: 20 },
    { mes: 'Ago', chuva: 27 },
    { mes: 'Set', chuva: 69 },
    { mes: 'Out', chuva: 120 },
    { mes: 'Nov', chuva: 222 },
    { mes: 'Dez', chuva: 253 }
  ];
  
  function GraficoChuva() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis label={{ value: 'mm de chuva', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="chuva" fill="#0077cc" name="Chuvas (mm)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default GraficoChuva;
  