import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const csvApiPlugin = () => ({
  name: 'csv-api-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/scan' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const csvLine = `${data.patient_id},${data.age},${data.gender},${data.chronic_diseases},${data.previous_admissions},${data.previous_surgeries},${data.family_medical_history},${data.current_medications},${data.smoking_status},${data.alcohol_consumption},${data.physical_activity_level},${data.height},${data.weight},${data.bmi},${data.known_allergies}\n`;
            
            const filePath = path.resolve(process.cwd(), 'dataset.csv');
            
            if (!fs.existsSync(filePath)) {
              fs.writeFileSync(filePath, 'patient_id,age,gender,chronic_diseases,previous_admissions,previous_surgeries,family_history,medications,smoking_status,alcohol_consumption,activity_level,height,weight,BMI,allergies\n');
            }
            
            fs.appendFileSync(filePath, csvLine);
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        return;
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), csvApiPlugin()],
  base: '/',
})
